// src/pages/NotFound.tsx

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>
          </div>
          <div className="relative space-y-4">
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 leading-none">
              404
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
              <Search className="h-8 w-8 text-indigo-400 animate-pulse" />
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto rounded-xl px-8 border-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-8"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8">
          <p className="text-sm text-slate-500">
            Need help? Contact our{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline"
            >
              support team
            </button>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}