import dns from "dns/promises";

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cache for the blocklist
let blockedDomainsCache: Set<string> | null = null;
let lastBlocklistFetchTimestamp: number = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const BLOCKLIST_URL = 'https://raw.githubusercontent.com/TempMailDetector/Temporary-Email-Domain-Blocklist/main/domains.txt';

async function getBlockedDomains(): Promise<Set<string>> {
  const now = Date.now();
  if (blockedDomainsCache && (now - lastBlocklistFetchTimestamp < CACHE_DURATION_MS)) {
    return blockedDomainsCache;
  }

  console.log("Fetching temporary domain blocklist...");
  try {
    const response = await fetch(BLOCKLIST_URL);
    if (!response.ok) {
      console.warn(`Failed to fetch temporary domain blocklist (status: ${response.status}). Using stale or empty cache if available.`);
      return blockedDomainsCache || new Set();
    }
    const text = await response.text();
    const newBlockedDomains = new Set(text.split('\n').map(d => d.trim()).filter(d => d.length > 0));
    blockedDomainsCache = newBlockedDomains;
    lastBlocklistFetchTimestamp = now;
    console.log(`Successfully fetched and cached ${newBlockedDomains.size} blocked domains.`);
    return newBlockedDomains;
  } catch (fetchError) {
    console.warn("Error fetching or processing temporary domain blocklist. Using stale or empty cache if available.", fetchError);
    return blockedDomainsCache || new Set();
  }
}

// Function to verify MX records of the email domain
async function verifyMxRecords(email: string): Promise<boolean> {
  const domain = email.substring(email.lastIndexOf("@") + 1);

  // Check against the cached blocklist
  try {
    const blockedDomains = await getBlockedDomains();
    if (blockedDomains.has(domain)) {
      console.log(`Domain ${domain} for email ${email} is on the blocklist.`);
      return false;
    }

    // Check for common test/invalid domains
    const invalidPatterns = ["example", "test", "demo", "localhost", "invalid"];
    if (invalidPatterns.some(pattern => email.includes(pattern))) {
      console.log(`Domain ${domain} for email ${email} contains invalid pattern.`);
      return false;
    }
    
  } catch (error) {
    console.warn("Error obtaining blocked domains list. Proceeding with MX check only.", error);
  }

  // MX record check
  try {
    const addresses = await dns.resolveMx(domain);
    return addresses && addresses.length > 0;
  } catch (error) {
    console.warn("MX record check failed for:", email, error);
    return false;
  }
}

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email is required." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: "Invalid email format." };
  }

  return { isValid: true };
}

export async function verifyEmailDeliverability(email: string): Promise<{ isDeliverable: boolean; error?: string }> {
  const isDeliverable = await verifyMxRecords(email);
  if (!isDeliverable) {
    return { 
      isDeliverable: false, 
      error: "Email domain does not appear to be valid or able to receive emails." 
    };
  }

  return { isDeliverable: true };
}

export function validateName(name: string, fieldName: string): { isValid: boolean; error?: string } {
  if (!name || typeof name !== "string") {
    return { isValid: false, error: `${fieldName} is required.` };
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return { isValid: false, error: `${fieldName} cannot be empty.` };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: `${fieldName} must be 50 characters or less.` };
  }

  return { isValid: true };
}

export function validateSubject(subject: string): { isValid: boolean; error?: string } {
  if (!subject || typeof subject !== "string") {
    return { isValid: false, error: "Subject is required." };
  }

  const trimmedSubject = subject.trim();
  if (trimmedSubject.length === 0) {
    return { isValid: false, error: "Subject cannot be empty." };
  }

  if (trimmedSubject.length > 255) {
    return { isValid: false, error: "Subject must be 255 characters or less." };
  }

  return { isValid: true };
}

export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message || typeof message !== "string") {
    return { isValid: false, error: "Message is required." };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return { isValid: false, error: "Message cannot be empty." };
  }

  if (trimmedMessage.length > 5000) {
    return { isValid: false, error: "Message must be 5000 characters or less." };
  }

  return { isValid: true };
}

export function validateContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const firstNameValidation = validateName(data.firstName, "First name");
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error!;
  }

  const lastNameValidation = validateName(data.lastName, "Last name");
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error!;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const subjectValidation = validateSubject(data.subject);
  if (!subjectValidation.isValid) {
    errors.subject = subjectValidation.error!;
  }

  const messageValidation = validateMessage(data.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error!;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}