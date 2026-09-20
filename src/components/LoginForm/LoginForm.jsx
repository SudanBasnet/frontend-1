"use client";

import AuthForm from "@/components/AuthForm/AuthForm";

const loginFields = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
    maxLength: 254,
    spellCheck: false,
    required: true,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];

const workspaceHighlights = [
  {
    label: "Write",
    description: "Create and refine posts without leaving your workspace.",
  },
  {
    label: "Publish",
    description: "Keep drafts and published stories organised in one view.",
  },
  {
    label: "Curate",
    description: "Upload gallery assets alongside your latest work.",
  },
];

function createLoginPayload(values) {
  return {
    email: values.email.trim(),
    password: values.password,
    remember: values.remember,
  };
}

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-5"
    >
      <path
        d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18l-1.8-5.4-5.7-1.8L10.2 9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoginForm() {
  return (
    <AuthForm
      title="Welcome back"
      description="Sign in to continue building and managing your work."
      fields={loginFields}
      submitLabel="Sign in"
      endpoint="/api/auth/login"
      eyebrow="Workspace access"
      footerText="Don't have an account?"
      footerLink={{ href: "/register", label: "Create an account" }}
      submitNote="Your session is protected with secure, HttpOnly cookies."
      transformValues={createLoginPayload}
      aside={
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            <SparkIcon />
            Frontend One
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.045em] text-zinc-950 sm:text-5xl dark:text-white">
            Pick up where your best ideas left off.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Your publishing tools, content library, and gallery are waiting in one focused dashboard.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {workspaceHighlights.map((highlight, index) => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-zinc-200/80 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                    {highlight.label}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <label className="group flex w-fit cursor-pointer items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          name="remember"
          type="checkbox"
          className="size-4 rounded border-zinc-300 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:focus-visible:ring-offset-zinc-900"
        />
        <span className="transition group-hover:text-zinc-950 dark:group-hover:text-white">
          Keep me signed in for 30 days
        </span>
      </label>
    </AuthForm>
  );
}
