"use client";

import React, { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import confetti from "canvas-confetti";
import {
  User,
  MapPin,
  Lock,
  ArrowLeft,
  CheckCircle,
  Pencil,
  Loader2,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export function Step4Confirmation() {
  const formData = useFormStore((state) => state.formData);
  const setStep = useFormStore((state) => state.setStep);
  const prevStep = useFormStore((state) => state.prevStep);
  const submitForm = useFormStore((state) => state.submitForm);
  const resetForm = useFormStore((state) => state.resetForm);
  const isSubmitting = useFormStore((state) => state.isSubmitting);
  const isSubmitted = useFormStore((state) => state.isSubmitted);

  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const handleSubmit = async () => {
    setSubmittedData(formData);
    await submitForm();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback safely ignored
    }
  };

  // If already submitted, display the celebratory success screen
  if (isSubmitted) {
    return (
      <div className="py-6 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 ring-2 ring-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Registration Successful
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome, {formData.fullName || "User"}!</h2>
          <p className="text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
            Your registration details have been validated, stored in Zustand, and logged to the console.
          </p>
        </div>

        {/* Payload output badge */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-left max-w-md mx-auto text-xs font-mono text-slate-300 space-y-1 overflow-x-auto">
          <p className="text-[11px] text-slate-500 mb-2 font-sans font-semibold uppercase tracking-wider">
            Console Payload Summary
          </p>
          <p><span className="text-slate-500">Username:</span> {formData.username}</p>
          <p><span className="text-slate-500">Email:</span> {formData.email}</p>
          <p><span className="text-slate-500">Location:</span> {formData.city}, {formData.country}</p>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all duration-150 cursor-pointer shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Register Another Account</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Review & Confirmation</h2>
        <p className="text-xs text-slate-400 mt-1">
          Please verify your information before finalizing registration. You can edit any section.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1: Personal Info */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 transition-all duration-200 hover:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wide uppercase">
              <User className="w-4 h-4" />
              <span>Personal Information</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-slate-500">Full Name</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.fullName || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Email Address</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.email || "—"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-500">Phone Number</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.phoneNumber || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Address */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 transition-all duration-200 hover:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wide uppercase">
              <MapPin className="w-4 h-4" />
              <span>Address Details</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="sm:col-span-2">
              <p className="text-slate-500">Street Address</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.streetAddress || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">City & Zip Code</p>
              <p className="font-medium text-slate-200 mt-0.5">
                {formData.city || "—"} ({formData.zipCode || "—"})
              </p>
            </div>
            <div>
              <p className="text-slate-500">Country</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.country || "—"}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Credentials */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 transition-all duration-200 hover:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wide uppercase">
              <Lock className="w-4 h-4" />
              <span>Account Credentials</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-slate-500">Username</p>
              <p className="font-medium text-slate-200 mt-0.5">{formData.username || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500">Password</p>
              <p className="font-mono text-slate-300 mt-0.5">••••••••••••</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Registration...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Submit Registration</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
