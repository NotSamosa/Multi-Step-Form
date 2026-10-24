"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1SchemaType } from "@/schemas/formSchemas";
import { useFormStore } from "@/store/useFormStore";
import { InputField } from "@/components/InputField";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

export function Step1Personal() {
  const formData = useFormStore((state) => state.formData);
  const updateFormData = useFormStore((state) => state.updateFormData);
  const nextStep = useFormStore((state) => state.nextStep);
  const markStepComplete = useFormStore((state) => state.markStepComplete);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Step1SchemaType>({
    resolver: zodResolver(step1Schema),
    mode: "onTouched",
    defaultValues: {
      fullName: formData.fullName || "",
      email: formData.email || "",
      phoneNumber: formData.phoneNumber || "",
    },
  });

  const onSubmit = (data: Step1SchemaType) => {
    updateFormData(data);
    markStepComplete(1);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h2 className="text-lg font-bold text-white">Personal Information</h2>
        <p className="text-xs text-slate-400 mt-1">
          Please provide your legal name and contact details to get started.
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Full Name"
          placeholder="e.g. Alex Johnson"
          icon={User}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="alex@example.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          icon={Phone}
          optional
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <span>Continue to Address</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
