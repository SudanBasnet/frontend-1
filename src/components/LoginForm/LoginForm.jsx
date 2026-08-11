import AuthForm from "@/components/AuthForm/AuthForm";

const loginFields = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    required: true,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    labelAction: (
      <button
        type="button"
        className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
      >
        Forgot password?
      </button>
    ),
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];

export default function LoginForm() {
  return (
    <AuthForm
      title="Welcome back"
      description="Enter your details to access your account."
      fields={loginFields}
      submitLabel="Sign in"
      footerText="Don't have an account?"
      footerLink={{ href: "/register", label: "Create an account" }}
    >
      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-zinc-400">
        <input
          name="remember"
          type="checkbox"
          className="size-4 rounded border-zinc-700 accent-blue-600"
        />
        Remember me
      </label>
    </AuthForm>
  );
}
