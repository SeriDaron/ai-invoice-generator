import React from "react";

export const InvoiceSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6 animate-pulse">
      {/* Invoice header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-slate-200 rounded-md" />
          <div className="h-4 w-32 bg-slate-200 rounded-md" />
        </div>
        <div className="h-8 w-24 bg-slate-200 rounded-md" />
      </div>

      <hr className="border-slate-100" />

      {/* Sender and recipient addresses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded-md" />
          <div className="h-4 w-40 bg-slate-200 rounded-md" />
          <div className="h-3 w-48 bg-slate-200 rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded-md" />
          <div className="h-4 w-40 bg-slate-200 rounded-md" />
          <div className="h-3 w-48 bg-slate-200 rounded-md" />
        </div>
      </div>

      {/* Line items table placeholder */}
      <div className="space-y-3 pt-4">
        <div className="grid grid-cols-12 gap-2 pb-2">
          <div className="h-4 col-span-6 bg-slate-200 rounded-md" />
          <div className="h-4 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-4 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-4 col-span-2 bg-slate-200 rounded-md" />
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="h-5 col-span-6 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="h-5 col-span-6 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
          <div className="h-5 col-span-2 bg-slate-200 rounded-md" />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
            <div className="h-4 w-20 bg-slate-200 rounded-md" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
            <div className="h-4 w-20 bg-slate-200 rounded-md" />
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100">
            <div className="h-5 w-20 bg-slate-200 rounded-md" />
            <div className="h-5 w-24 bg-slate-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
