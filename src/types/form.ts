export type FormStep = 1 | 2 | 3 | 4;

export interface Step1Data {
  fullName: string;
  email: string;
  phoneNumber?: string;
}

export interface Step2Data {
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Step3Data {
  username: string;
  password: string;
  confirmPassword: string;
}

export type MultiStepFormData = Step1Data & Step2Data & Step3Data;

export interface FormState {
  currentStep: FormStep;
  formData: MultiStepFormData;
  completedSteps: number[];
  isSubmitted: boolean;
  isSubmitting: boolean;
  
  // Actions
  setStep: (step: FormStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<MultiStepFormData>) => void;
  markStepComplete: (step: number) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}
