"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgPrimary px-4">
      <div className="max-w-lg w-full bg-cardC rounded-lg shadow-sm border border-cardCB p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-primaryC" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-textNa mb-2">
          Oops! Something went wrong
        </h1>

        <p className="text-textNc mb-6">
          {msg || "An unexpected error occurred. Please try again."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-cardICB text-textNa rounded-md hover:bg-cardICB/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primaryC  hover:bg-primaryHC text-white rounded-md  transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Additional Help */}
        <p className="text-sm text-textNd mt-6">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
