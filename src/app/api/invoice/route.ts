import { NextRequest, NextResponse } from "next/server";
import { Invoice, InvoiceGenerationRequest } from "@/core/types/invoice";
import { FALLBACK_INVOICE } from "@/core/constants/fallbacks";

// Helper that simulates latency and can be cancelled via AbortSignal
const delayWithSignal = (ms: number, signal?: AbortSignal): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", onAbort);
  });
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // Extract the native AbortSignal from the incoming Next.js request
  const { signal } = request;

  try {
    // 1. Validate the request body
    const body: InvoiceGenerationRequest = await request.json();
    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt' field in request body." },
        { status: 400 }
      );
    }

    // 2. Simulate the AI text analysis phase (NLP Tokenization Phase)
    // If the client aborts the request (AbortController on the frontend), the promise rejects into the catch block
    await delayWithSignal(1200, signal);

    // 3. Dynamically build the simulated data from the prompt
    const lowerPrompt = body.prompt.toLowerCase();
    const isEuro = lowerPrompt.includes("euro") || lowerPrompt.includes("eur");
    const currency = isEuro ? "EUR" : (body.currency || "USD");
    const taxRate = body.taxRate ?? 0.2; // Defaults to 20% VAT

    // Simulate the financial table calculation phase (Math Synthesis Phase)
    await delayWithSignal(1000, signal);

    // Select line items based on keywords in the prompt
    let generatedItems = [
      {
        id: "sim-item-1",
        description: "SaaS Platform Enterprise Subscription (Annual License)",
        quantity: 1,
        price: 5000.0,
        total: 5000.0,
      },
      {
        id: "sim-item-2",
        description: "Dedicated AI Agent Infrastructure Nodes (Provisioning & Maintenance)",
        quantity: 3,
        price: 450.0,
        total: 1350.0,
      }
    ];

    if (lowerPrompt.includes("marketing")) {
      generatedItems = [
        {
          id: "sim-item-1",
          description: "B2B Content Marketing Campaign Management & SEO Strategy",
          quantity: 1,
          price: 3200.0,
          total: 3200.0,
        },
        {
          id: "sim-item-2",
          description: "Copywriting Services: Technical Whitepapers & Blog Posts",
          quantity: 5,
          price: 300.0,
          total: 1500.0,
        }
      ];
    }

    // Calculate financial totals
    const subtotal = generatedItems.reduce((acc, item) => acc + item.total, 0);
    const taxTotal = Math.round(subtotal * taxRate * 100) / 100;
    const grandTotal = subtotal + taxTotal;

    const processingTimeMs = Date.now() - startTime;

    // Assemble the final invoice object
    const successfulInvoice: Invoice = {
      id: `inv_llm_${Math.random().toString(36).substring(2, 9)}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      sender: {
        name: "NextGen Software Solutions Inc.",
        email: "billing@nextgen-software.io",
        address: "555 Mission St, San Francisco, CA 94105",
        vatId: "US112233445",
      },
      receiver: {
        name: "Target Client Enterprise LLC",
        email: "procurement@target-client.com",
        address: "789 Broadway, New York, NY 10003",
      },
      items: generatedItems,
      subtotal,
      taxRate,
      taxTotal,
      grandTotal,
      currency,
      aiNotes: `AI Summary: Invoice generated successfully matching intent for business architecture optimized under strict mode parameters. Prompt confidence high.`,
      metadata: {
        generatedBy: "simulation-llm",
        confidenceScore: 0.94,
        processingTimeMs,
        tokensEstimated: Math.floor(body.prompt.length / 4) + 120,
      },
    };

    return NextResponse.json(successfulInvoice, { status: 200 });

  } catch (error: unknown) {
    // Handle abort or timeout
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("[API] Invoice generation was aborted by the client/timeout constraint.");
    } else {
      console.error("[API] Unexpected error encountered during generation pipeline:", error);
    }

    // Always return a resilient fallback invoice
    const fallbackResponse: Invoice = {
      ...FALLBACK_INVOICE,
      metadata: {
        ...FALLBACK_INVOICE.metadata,
        processingTimeMs: Date.now() - startTime,
      },
    };

    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}
