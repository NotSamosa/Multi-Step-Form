"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2SchemaType, COUNTRIES } from "@/schemas/formSchemas";
import { useFormStore } from "@/store/useFormStore";
import { InputField } from "@/components/InputField";
import { Home, Building2, Hash, Globe, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

export function Step2Address() {
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);
  const markStepComplete = useFormStore((state) => state.markStepComplete);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Step2SchemaType>({
    resolver: zodResolver(step2Schema),
    mode: "onTouched",
    defaultValues: {
      streetAddress: formData.streetAddress || "",
      city: formData.city || "",
      zipCode: formData.zipCode || "",
      country: formData.country || "",
    },
  });

  const onSubmit = (data: Step2SchemaType) => {
    updateFormData(data);
    markStepComplete(2);
    nextStep();
  };

  const handleBack = () => {
    // Preserve whatever the user has typed so far before going back
    const currentValues = getValues();
    updateFormData(currentValues);
    prevStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h2 className="text-lg font-bold text-white">Address Details</h2>
        <p className="text-xs text-slate-400 mt-1">
          Where should we register your physical account location?
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Street Address"
          placeholder="123 Innovation Boulevard, Suite 400"
          icon={Home}
          error={errors.streetAddress?.message}
          {...register("streetAddress")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="City"
            placeholder="San Francisco"
            icon={Building2}
            error={errors.city?.message}
            {...register("city")}
          />

          <InputField
            label="Zip / Postal Code"
            placeholder="94103"
            icon={Hash}
            error={errors.zipCode?.message}
            {...register("zipCode")}
          />
        </div>

        {/* Country Dropdown */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="country-select" className="text-xs font-semibold text-slate-300">
            Country <span className="text-rose-400">*</span>
          </label>

          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Globe className="w-4 h-4" />
            </div>

            <select
              id="country-select"
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "country-error" : undefined}
              className={`w-full appearance-none rounded-xl bg-slate-950/70 border text-slate-100 text-sm py-2.5 pl-10 pr-8 transition-all duration-200 outline-none cursor-pointer ${
                errors.country
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700"
              }`}
              {...register("country")}
            >
              <option value="" disabled className="bg-slate-900 text-slate-500">
                Select your country...
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {errors.country && (
            <p
              id="country-error"
              role="alert"
              className="flex items-center gap-1.5 text-xs text-rose-400 mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.country.message}</span>
            </p>
          )}
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
          <span>Continue to Credentials</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
