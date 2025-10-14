"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-500" />
        </div>
        
        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
        
        <p className="text-gray-600 mb-6">
          {msg || "An unexpected error occurred. Please try again."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Additional Help */}
        <p className="text-sm text-gray-500 mt-6">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}