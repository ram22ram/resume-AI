export interface CoverLetterData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
  };
  recipientInfo: {
    name: string;
    role: string;
    company: string;
    address: string;
  };
  content: {
    date: string;
    subject: string;
    body: string;
    closing: string;
  };
  metadata?: {
    accentColor?: string;
    fontFamily?: string;
    fontSize?: number;
  };
}
