"use client";

import AuthForm from "@/components/AuthForm/AuthForm";

const registerFields = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Full name",
    placeholder: "Your full name",
    autoComplete: "name",
    minLength: 2,
    maxLength: 80,
    required: true,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    maxLength: 254,
    required: true,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Create a password",
    autoComplete: "new-password",
    minLength: 8,
    hint: "Use at least 8 characters. Longer passwords are easier to keep secure.",
    required: true,
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
    placeholder: "Enter your password again",
    autoComplete: "new-password",
    minLength: 8,
    required: true,
  },
];

function validateRegistration(values) {
  if (values.name.trim().length < 2) {
    return "Enter your full name using at least 2 characters.";
  }

  if (values.password !== values.confirmPassword) {
    return "Your passwords do not match. Please try again.";
  }

  return "";
}

function createRegistrationPayload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password,
  };
}

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
  >
    <path
      d="m5 10 3.25 3.25L15 6.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const registrationBenefits = [
  "Create, edit, and manage your writing in one place.",
  "Keep portfolio updates and gallery uploads organised.",
  "Move straight into your personal dashboard after sign up.",
];

export default function RegisterForm() {
  return (
    <AuthForm
      title="Create an account"
      description="Set up your workspace in a few seconds."
      fields={registerFields}
      submitLabel="Create account"
      endpoint="/api/auth/register"
      eyebrow="Join the workspace"
      footerText="Already have an account?"
      footerLink={{ href: "/login", label: "Sign in" }}
      submitNote="Your account details are only used to access this workspace."
      validate={validateRegistration}
      transformValues={createRegistrationPayload}
      aside={
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
            Frontend One
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-zinc-950 sm:text-5xl dark:text-white">
            Your ideas deserve a focused place to grow.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Create an account to access the publishing workspace behind the portfolio.
          </p>

          <ul className="mt-8 space-y-4" aria-label="Account benefits">
            {registrationBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-600/10">
                  <CheckIcon />
                </span>
                <span className="pt-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
