"use client";

import React from "react";
import { useFormStore } from "@/store/useFormStore";
import { FormStep } from "@/types/form";
import { User, MapPin, Lock, CheckCircle2, Check } from "lucide-react";

interface StepMeta {
  id: FormStep;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepMeta[] = [
  { id: 1, label: "Personal Info", sublabel: "Your details", icon: User },
  { id: 2, label: "Address", sublabel: "Where you live", icon: MapPin },
  { id: 3, label: "Credentials", sublabel: "Account security", icon: Lock },
  { id: 4, label: "Confirm", sublabel: "Review & submit", icon: CheckCircle2 },
];

export function StepIndicator() {
  const currentStep = useFormStore((state) => state.currentStep);
  const completedSteps = useFormStore((state) => state.completedSteps);
  const setStep = useFormStore((state) => state.setStep);

  // Progress percentage
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const handleStepClick = (stepId: FormStep) => {
    // Allow jumping back to earlier steps or completed steps
    if (stepId < currentStep || completedSteps.includes(stepId)) {
      setStep(stepId);
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Top Progress Track */}
      <div className="relative mb-6">
        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 px-1 text-xs text-slate-400">
          <span>Step {currentStep} of {STEPS.length}</span>
          <span className="font-medium text-slate-300">
            {Math.round(progressPercent)}% Completed
          </span>
        </div>
      </div>

      {/* Stepper Nodes */}
      <nav aria-label="Registration Steps">
        <ol className="grid grid-cols-4 gap-2 sm:gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isClickable = step.id < currentStep || isCompleted;

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => handleStepClick(step.id)}
                  className={`w-full group flex flex-col items-center sm:items-start text-left transition-all duration-200 rounded-xl p-2 sm:p-3 ${
                    isClickable
                      ? "cursor-pointer hover:bg-slate-800/40"
                      : "cursor-default opacity-60"
                  } ${
                    isCurrent
                      ? "bg-slate-800/50 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10"
                      : ""
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 font-medium text-xs ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                          : isCurrent
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400/40"
                          : "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold hidden sm:inline-block ${
                        isCurrent
                          ? "text-indigo-300"
                          : isCompleted
                          ? "text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      Step {step.id}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-semibold truncate max-w-full text-center sm:text-left ${
                      isCurrent
                        ? "text-white"
                        : isCompleted
                        ? "text-slate-200"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p className="text-[11px] text-slate-500 hidden sm:block truncate max-w-full">
                    {step.sublabel}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
