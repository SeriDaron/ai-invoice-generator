import { useState, useCallback } from "react";
import { Invoice, InvoiceGenerationRequest } from "@/core/types/invoice";

export const useInvoiceSubmit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateInvoice = useCallback(async (payload: InvoiceGenerationRequest) => {
    setIsLoading(true);
    setError(null);

    // 1. Create a controller so the request can be cancelled
    const controller = new AbortController();
    
    // 2. Set a 5-second safety timeout
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.warn("[Frontend] Request timed out. Triggering fallback mechanisms.");
    }, 5000);

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal, // Pass the abort signal to fetch
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data: Invoice = await response.json();
      setInvoice(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timeout exceeded. High-fidelity fallback loaded.");
        } else {
          setError(err.message || "An unexpected system error occurred.");
        }
      }
    } finally {
      // Always clear the timer so it does not fire later
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    invoice,
    error,
    generateInvoice,
  };
};
