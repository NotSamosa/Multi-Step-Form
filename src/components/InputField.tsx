"use client";

import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, optional = false, icon: Icon, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex justify-between items-center">
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-300">
            {label} {!optional && <span className="text-rose-400">*</span>}
          </label>
          {optional && <span className="text-[11px] text-slate-500 font-normal">Optional</span>}
        </div>

        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`w-full rounded-xl bg-slate-950/70 border text-slate-100 placeholder-slate-500 text-sm py-2.5 transition-all duration-200 outline-none ${
              Icon ? "pl-10 pr-3.5" : "px-3.5"
            } ${
              error
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700"
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
