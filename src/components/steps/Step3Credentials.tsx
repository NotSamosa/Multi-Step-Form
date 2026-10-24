"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3SchemaType } from "@/schemas/formSchemas";
import { useFormStore } from "@/store/useFormStore";
import { InputField } from "@/components/InputField";
import { UserCheck, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export function Step3Credentials() {
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);
  const markStepComplete = useFormStore((state) => state.markStepComplete);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Step3SchemaType>({
    resolver: zodResolver(step3Schema),
    mode: "onTouched",
    defaultValues: {
      username: formData.username || "",
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
    },
  });

  const passwordValue = watch("password") || "";

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(passwordValue);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-slate-700",
    "bg-rose-500",
    "bg-amber-500",
    "bg-indigo-400",
    "bg-emerald-400",
  ];

  const onSubmit = (data: Step3SchemaType) => {
    updateFormData(data);
    markStepComplete(3);
    nextStep();
  };

  const handleBack = () => {
    const currentValues = getValues();
    updateFormData(currentValues);
    prevStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h2 className="text-lg font-bold text-white">Account Credentials</h2>
        <p className="text-xs text-slate-400 mt-1">
          Secure your account with a unique username and strong password.
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Username"
          placeholder="e.g. alex_johnson"
          icon={UserCheck}
          error={errors.username?.message}
          {...register("username")}
        />

        {/* Password field with show/hide toggle */}
        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            icon={Lock}
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password Strength Meter */}
        {passwordValue.length > 0 && (
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Password Strength</span>
              <span className={`font-semibold ${strength >= 3 ? "text-emerald-400" : "text-amber-400"}`}>
                {strengthLabels[strength]}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`rounded-full transition-all duration-300 ${
                    strength >= level ? strengthColors[strength] : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Must be at least 8 characters. Mix uppercase letters, numbers, and symbols for better security.
            </p>
          </div>
        )}

        {/* Confirm Password field with show/hide toggle */}
        <div className="relative">
          <InputField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <span>Review & Confirm</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
