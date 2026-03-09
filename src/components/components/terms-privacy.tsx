"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { ChevronLeft } from "lucide-react";

interface TermsPrivacyProps {
  onAgree: () => void;
  onBack: () => void;
}

export function TermsPrivacy({ onAgree, onBack }: TermsPrivacyProps) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const isButtonDisabled = !agreedTerms || !agreedPrivacy;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(2, 6, 23) 50%, rgb(23, 37, 84) 100%)`,
          backgroundSize: "400% 400%",
          animation: "gradientShift 20s ease infinite",
          height: "100vh",
        }}
      />

      {/* Metallic Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1), transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.08), transparent 50%)
          `,
          backgroundSize: "200% 200%",
          animation: "metallicShift 20s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-montserrat">Back</span>
          </button>

          {/* Card */}
          <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
            <h1 className="text-3xl font-bold font-montserrat text-white mb-8">
              Terms of Service & Privacy Policy
            </h1>

            {/* Terms Content */}
            <div className="space-y-6 mb-8">
              <div>
                <h2 className="text-xl font-bold font-montserrat text-blue-400 mb-3">
                  Terms of Service
                </h2>
                <p className="text-slate-300 font-montserrat leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-montserrat text-blue-400 mb-3">
                  Privacy Policy
                </h2>
                <p className="text-slate-300 font-montserrat leading-relaxed">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                  natus error sit voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold font-montserrat text-slate-200 mb-2">
                  Data Protection
                </h3>
                <p className="text-slate-300 font-montserrat leading-relaxed">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                  fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                  sit amet, consectetur, adipisci velit.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-8" />

            {/* Checkboxes */}
            <div className="space-y-4 mb-8">
              {/* Terms Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-5 h-5 rounded border border-blue-500 bg-slate-800 cursor-pointer accent-blue-500"
                />
                <span className="text-slate-300 font-montserrat group-hover:text-slate-200 transition-colors">
                  I agree to the Terms of Service
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>

              {/* Privacy Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  className="w-5 h-5 rounded border border-blue-500 bg-slate-800 cursor-pointer accent-blue-500"
                />
                <span className="text-slate-300 font-montserrat group-hover:text-slate-200 transition-colors">
                  I agree to the Privacy Policy
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
            </div>

            {/* Agree Button */}
            <Button
              onClick={onAgree}
              isDisabled={isButtonDisabled}
              color="primary"
              className="w-full font-montserrat font-semibold py-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              Agree and Continue
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes metallicShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
