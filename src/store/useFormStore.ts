import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FormState, FormStep, MultiStepFormData } from "@/types/form";

const initialFormData: MultiStepFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  country: "",
  username: "",
  password: "",
  confirmPassword: "",
};

interface FormStore extends FormState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: initialFormData,
      completedSteps: [],
      isSubmitted: false,
      isSubmitting: false,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      setStep: (step: FormStep) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) {
          set({ currentStep: (currentStep + 1) as FormStep });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: (currentStep - 1) as FormStep });
        }
      },

      updateFormData: (data: Partial<MultiStepFormData>) => {
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        }));
      },

      markStepComplete: (step: number) => {
        set((state) => {
          if (!state.completedSteps.includes(step)) {
            return { completedSteps: [...state.completedSteps, step] };
          }
          return state;
        });
      },

      submitForm: async () => {
        set({ isSubmitting: true });
        
        // Simulate API latency for realistic UX
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const finalData = get().formData;
        console.log("=== Multi-Step Form Successfully Submitted ===");
        console.log(JSON.stringify(finalData, null, 2));

        set({
          isSubmitting: false,
          isSubmitted: true,
          completedSteps: [1, 2, 3, 4],
        });
      },

      resetForm: () => {
        set({
          currentStep: 1,
          formData: initialFormData,
          completedSteps: [],
          isSubmitted: false,
          isSubmitting: false,
        });
      },
    }),
    {
      name: "multistep-form-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      })),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
