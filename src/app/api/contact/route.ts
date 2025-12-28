import { maileroo, type AttachmentObject } from "@/lib/maileroo";
import { createClient } from "@/lib/supabase";
import { validateContactForm, verifyEmailDeliverability } from "@/lib/validation";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// File upload configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

async function processAttachments(files: File[]): Promise<AttachmentObject[]> {
  const attachments: AttachmentObject[] = [];
  
  for (const file of files) {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`);
    }
    
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed for ${file.name}.`);
    }
    
    // Convert to base64
    const buffer = await file.arrayBuffer();
    const base64Content = Buffer.from(buffer).toString('base64');
    
    attachments.push({
      file_name: file.name,
      content_type: file.type,
      content: base64Content,
      inline: false
    });
  }
  
  return attachments;
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  let formData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  };
  let attachments: AttachmentObject[] = [];

  try {
    // Check if the request is multipart/form-data (with files) or regular JSON
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const data = await request.formData();
      
      formData = {
        firstName: data.get('firstName') as string,
        lastName: data.get('lastName') as string,
        email: data.get('email') as string,
        subject: data.get('subject') as string,
        message: data.get('message') as string,
      };
      
      // Process file attachments
      const files = data.getAll('files') as File[];
      if (files.length > 0) {
        attachments = await processAttachments(files.filter(file => file.size > 0));
      }
    } else {
      const body = await request.json();
      formData = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        subject: body.subject,
        message: body.message,
      };
    }

  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json({ 
      message: "Invalid request body. Please check your form data." 
    }, { status: 400 });
  }

  // Validate form data
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    return NextResponse.json({ 
      message: "Validation failed.", 
      errors: validation.errors 
    }, { status: 400 });
  }

  // Verify email deliverability
  const emailVerification = await verifyEmailDeliverability(formData.email);
  if (!emailVerification.isDeliverable) {
    return NextResponse.json({ 
      message: emailVerification.error 
    }, { status: 400 });
  }

  try {
    // Check if email already exists
    const { data: existingSubmission, error: selectError } = await supabase
      .from("contact_submissions")
      .select("email, created_at, first_name, last_name")
      .eq("email", formData.email.toLowerCase().trim())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (selectError) {
      console.error("Error checking existing submission:", selectError);
      return NextResponse.json({ 
        message: "Error checking previous submissions.", 
        error: selectError.message 
      }, { status: 500 });
    }

    if (existingSubmission) {
      const submissionDate = new Date(existingSubmission.created_at);
      const formattedDate = submissionDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      return NextResponse.json({ 
        message: `Hi ${existingSubmission.first_name}, we received your previous request on ${formattedDate}. Our team will connect with you soon. If this is urgent, please call us directly.`,
        previousSubmission: true,
        submissionDate: existingSubmission.created_at
      }, { status: 200 });
    }

    // Store contact form submission in Supabase
    const { data: contactData, error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        has_attachments: attachments.length > 0,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting contact submission:", insertError);
      return NextResponse.json({ 
        message: "Error saving contact form submission.", 
        error: insertError.message 
      }, { status: 500 });
    }

    // Send notification email to admin
    try {
      await maileroo.sendContactNotification({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      console.log("Contact notification email sent successfully");
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
      // Don't fail the entire request if email fails
    }

    // Send confirmation email to user
    try {
      await maileroo.sendContactConfirmation({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject,
      });
      console.log("Contact confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the entire request if email fails
    }

    // Update submission status to indicate emails were processed
    await supabase
      .from("contact_submissions")
      .update({ status: 'processed' })
      .eq('id', contactData.id);

    return NextResponse.json({ 
      message: "Thank you for your message! We'll get back to you soon.",
      submissionId: contactData.id
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ 
      message: "An unexpected error occurred while processing your request.", 
      error: errorMessage 
    }, { status: 500 });
  }
}