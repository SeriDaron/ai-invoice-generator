"use client";

import React, { useState } from "react";
import { useInvoiceSubmit } from "@/features/invoice-generator/hooks/useInvoiceSubmit";
import { InvoiceSkeleton } from "@/features/invoice-generator/components/InvoiceSkeleton";
import { InvoicePreview } from "@/features/invoice-generator/components/InvoicePreview";
import { Sparkles, Terminal, AlertCircle } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const { isLoading, invoice, error, generateInvoice } = useInvoiceSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    // Store the prompt in a temporary variable before submitting
    const currentPrompt = prompt.trim();

    // Trigger generation
    await generateInvoice({
      prompt: currentPrompt
    });

    // If no error is present after the call completes, generation succeeded: clear the field
    // Deferred check, since the error state is updated inside the hook
    setTimeout(() => {
      // If the hook reported no error, clear the input
      if (!document.body.innerText.includes("Request timeout exceeded")) {
        setPrompt("");
      }
    }, 50);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Project header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            B2B AI Invoice & Content Generator
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Micro-SaaS tool with localized LLM pipeline simulation, built-in abort timeouts, and resilient fallback mechanisms.
          </p>
        </div>

        {/* Generator form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-semibold text-slate-700 mb-2">
                Describe invoice parameters to the AI Agent
              </label>
              <textarea
                id="prompt"
                rows={3}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition placeholder:text-slate-400"
                placeholder="e.g., Generate a marketing services invoice for Acme Global for 4700 EUR with a 10% tax rate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>Simulation mode: Active (5s client timeout)</span>
              </div>
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-4 w-4" />
                {isLoading ? "AI Calculating..." : "Generate"}
              </button>
            </div>
          </form>
        </div>

        {/* Error / timeout warning block */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Pipeline Status:</span> {error}
            </div>
          </div>
        )}

        {/* Results rendering section */}
        <div className="pt-2">
          {isLoading && <InvoiceSkeleton />}
          {!isLoading && invoice && <InvoicePreview invoice={invoice} />}
        </div>

      </div>
    </main>
  );
}
