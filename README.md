# 🚀 Multi-Step Registration Form

A production-ready, accessible, multi-step registration application built with **Next.js 16 (App Router)**, **React Hook Form**, **Zod**, and **Zustand** persistent state management.

---

## 🌟 Highlights & Features

- **Multi-Step Guided Flow**:
  - **Step 1: Personal Information** — Full Name (required, min 2 chars), Email (strictly validated format), Phone Number (optional with format check).
  - **Step 2: Address Details** — Street Address, City, numeric Zip Code validation, Country dropdown.
  - **Step 3: Account Credentials** — Username (alphanumeric/underscore), Password (min 8 chars with live strength meter & show/hide toggle), Confirm Password (must match).
  - **Step 4: Review & Confirmation** — Clean summary of all entered details with 1-click **Edit** shortcuts back to any section, final submission with simulation loader, console payload logging, and celebratory confetti.
- **Persistent State Management**:
  - Global store powered by **Zustand** with `persist` middleware (`localStorage`).
  - Form state survives page reloads and step navigation seamlessly.
- **Form Validation & UX**:
  - Strict schema validations powered by **Zod** and `@hookform/resolvers`.
  - Accessible inline error feedback with `aria-invalid` and `role="alert"`.
  - Input field focus states and icon decorations.
- **Interactive Step Navigation**:
  - Dynamic progress indicator bar with animated completion percentage.
  - Clickable step indicators allowing quick jumps to previously completed steps.
  - Fluid step animations powered by **Framer Motion**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/) & [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- **State & Persistence**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Celebration Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
task4/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global Tailwind styling & CSS theme variables
│   │   ├── layout.tsx          # Root layout with Geist font & dark aesthetic
│   │   └── page.tsx            # Main multi-step application page
│   ├── components/
│   │   ├── InputField.tsx       # Reusable input field with label, icon & error alert
│   │   ├── StepIndicator.tsx   # Progress bar & interactive step navigation
│   │   ├── FormCardWrapper.tsx # Framer Motion container for smooth slide transitions
│   │   └── steps/
│   │       ├── Step1Personal.tsx      # Step 1 form (Personal Info)
│   │       ├── Step2Address.tsx       # Step 2 form (Address Details)
│   │       ├── Step3Credentials.tsx   # Step 3 form (Credentials & Strength Meter)
│   │       └── Step4Confirmation.tsx  # Step 4 form (Review, Edit & Submission)
│   ├── hooks/
│   │   └── useFormHydration.ts # SSR-safe hydration hook for Zustand persistence
│   ├── schemas/
│   │   └── formSchemas.ts      # Zod validation schemas & countries list
│   ├── store/
│   │   └── useFormStore.ts     # Persistent Zustand form store & actions
│   └── types/
│       └── form.ts             # TypeScript interfaces for form data & store
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the application.

### 3. Production Build
```bash
npm run build
npm run start
```
