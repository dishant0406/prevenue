interface EmailObject {
  address: string;
  display_name?: string;
}

interface AttachmentObject {
  file_name: string;
  content_type?: string;
  content: string;
  inline?: boolean;
}

interface MailerooEmailRequest {
  from: EmailObject;
  to: EmailObject | EmailObject[];
  cc?: EmailObject | EmailObject[];
  bcc?: EmailObject | EmailObject[];
  reply_to?: EmailObject | EmailObject[];
  subject: string;
  template_id?: number;
  template_data?: Record<string, unknown>;
  html?: string;
  plain?: string;
  tracking?: boolean;
  tags?: Record<string, string>;
  headers?: Record<string, string>;
  attachments?: AttachmentObject[];
  scheduled_at?: string;
  reference_id?: string;
}

interface MailerooResponse {
  success: boolean;
  message: string;
  data?: {
    reference_id: string;
  };
}

interface MailerooErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

class MailerooService {
  private apiKey: string;
  private baseUrl = 'https://smtp.maileroo.com/api/v2/emails';
  private templateUrl = 'https://smtp.maileroo.com/api/v2/emails/template';
  private readonly CONTACT_TEMPLATE_ID = 5181;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Maileroo API key is required');
    }
    this.apiKey = apiKey;
  }

  async sendEmail(emailData: MailerooEmailRequest, useTemplate: boolean = false): Promise<MailerooResponse> {
    try {
      const url = useTemplate ? this.templateUrl : this.baseUrl;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': this.apiKey, // Primary authentication method
          'Authorization': `Bearer ${this.apiKey}`, // Alternative authentication method
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorResponse = data as MailerooErrorResponse;
        const errorMessage = this.getErrorMessage(response.status, errorResponse);
        throw new Error(errorMessage);
      }

      if (!data.success) {
        throw new Error(`Maileroo API error: ${data.message}`);
      }

      return data as MailerooResponse;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Maileroo send email error:', error.message);
        throw error;
      }
      console.error('Maileroo send email error:', error);
      throw new Error('Failed to send email via Maileroo');
    }
  }

  async sendContactNotification({
    firstName,
    lastName,
    email,
    subject,
    message,
    attachments,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    attachments?: AttachmentObject[];
  }): Promise<MailerooResponse> {
    const emailData: MailerooEmailRequest = {
      from: {
        address: process.env.MAILEROO_FROM_EMAIL!,
        display_name: 'Contact Form',
      },
      to: {
        address: process.env.MAILEROO_TO_EMAIL!,
        display_name: 'Support Team',
      },
      reply_to: {
        address: email,
        display_name: `${firstName} ${lastName}`,
      },
      subject: `Contact Form: ${subject}`,
      template_id: this.CONTACT_TEMPLATE_ID,
      template_data: {
        firstName,
        lastName,
        email,
        subject,
        message,
      },
      tracking: true,
      tags: {
        type: 'contact_form',
        source: 'website',
      },
      attachments,
    };

    return this.sendEmail(emailData, true);
  }

  async sendContactConfirmation({
    firstName,
    lastName,
    email,
    subject,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
  }): Promise<MailerooResponse> {
    const emailData: MailerooEmailRequest = {
      from: {
        address: process.env.MAILEROO_FROM_EMAIL!,
        display_name: 'Support Team',
      },
      to: {
        address: email,
        display_name: `${firstName} ${lastName}`,
      },
      subject: `Thank you for contacting us - ${subject}`,
      template_id: this.CONTACT_TEMPLATE_ID,
      template_data: {
        firstName,
        lastName,
        subject,
      },
      tracking: true,
      tags: {
        type: 'contact_confirmation',
        source: 'website',
      },
    };

    return this.sendEmail(emailData, true);
  }

  private getErrorMessage(status: number, errorResponse: MailerooErrorResponse): string {
    const baseMessage = errorResponse.message || 'Unknown error occurred';
    
    switch (status) {
      case 400:
        return `Bad Request: ${baseMessage}`;
      case 401:
        return 'Authentication failed. Please check your API key.';
      case 403:
        return 'Access forbidden. Your IP address may not have permission to access this resource.';
      case 404:
        return 'API endpoint not found. Please check the request URL.';
      case 429:
        return 'Rate limit exceeded. Please wait before making another request.';
      case 500:
        return `Internal server error: ${baseMessage}`;
      default:
        return `HTTP ${status}: ${baseMessage}`;
    }
  }
}

// Export singleton instance
export const maileroo = new MailerooService(process.env.MAILEROO_API_KEY!);

// Export types for use in other files
export type { AttachmentObject, EmailObject, MailerooEmailRequest, MailerooResponse, MailerooErrorResponse };
