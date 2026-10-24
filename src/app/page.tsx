"use client";

import React from "react";
import { StepIndicator } from "@/components/StepIndicator";
import { FormCardWrapper } from "@/components/FormCardWrapper";
import { useFormStore } from "@/store/useFormStore";
import { useFormHydration } from "@/hooks/useFormHydration";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  const isHydrated = useFormHydration();
  const currentStep = useFormStore((state) => state.currentStep);
  const isSubmitted = useFormStore((state) => state.isSubmitted);

  if (!isHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading form state...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20 mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>React Hook Form + Zustand</span>
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Persistent State
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            Complete the 4 simple steps below. Your input is validated and saved automatically.
          </p>
        </div>

        {/* Card Frame */}
        <div className="bg-slate-900/80 border border-slate-800/80 shadow-2xl shadow-indigo-950/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Stepper Header */}
          <StepIndicator />

          {/* Form Step Animated Content */}
          <FormCardWrapper>
            <div className="py-8 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
              <p className="text-slate-300 font-medium">
                Step {currentStep} Active Shell
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Phase 3 complete: Stepper header, progress track, and animated container ready.
              </p>
            </div>
          </FormCardWrapper>
        </div>

        {/* Footer Note */}
        <footer className="mt-6 text-center text-xs text-slate-500">
          Powered by Next.js 16 App Router • React Hook Form • Zod • Zustand
        </footer>
      </div>
    </main>
  );
}
