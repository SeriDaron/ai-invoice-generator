import { Invoice } from "../types/invoice";

export const FALLBACK_INVOICE: Invoice = {
  id: "inv_fallback_9921",
  invoiceNumber: "INV-2026-001F",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  sender: {
    name: "AI Frameworks Lab LLC",
    email: "billing@aiframeworks.io",
    address: "100 Pine St, San Francisco, CA 94111",
    vatId: "US998877665",
  },
  receiver: {
    name: "Acme Global Corporation",
    email: "accounts@acme-global.com",
    address: "Enterprise Tower, Level 42, Austin, TX 78701",
  },
  items: [
    {
      id: "item-1",
      description: "Fallback Pipeline Trigger: B2B Content Strategy & Smart Prompt Mapping Architecture",
      quantity: 1,
      price: 2450.0,
      total: 2450.0,
    },
    {
      id: "item-2",
      description: "Automated System Integration (Local Frontend Simulator Engine Setup)",
      quantity: 10,
      price: 150.0,
      total: 1500.0,
    },
  ],
  subtotal: 3950.0,
  taxRate: 0.1,
  taxTotal: 395.0,
  grandTotal: 4345.0,
  currency: "USD",
  aiNotes: "NOTICE: This invoice was compiled by the local fallback engine due to an upstream network timeout or manual pipeline interruption.",
  metadata: {
    generatedBy: "fallback-engine",
    confidenceScore: 1.0,
    processingTimeMs: 5,
    tokensEstimated: 0,
  },
};
