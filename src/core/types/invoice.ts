export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CompanyDetails {
  name: string;
  email: string;
  address: string;
  vatId?: string;
}

export interface InvoiceMetadata {
  generatedBy: "simulation-llm" | "fallback-engine";
  confidenceScore: number;
  processingTimeMs: number;
  tokensEstimated: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  sender: CompanyDetails;
  receiver: CompanyDetails;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxTotal: number;
  grandTotal: number;
  currency: string;
  aiNotes?: string;
  metadata: InvoiceMetadata;
}

export interface InvoiceGenerationRequest {
  prompt: string;
  currency?: string;
  taxRate?: number;
}
