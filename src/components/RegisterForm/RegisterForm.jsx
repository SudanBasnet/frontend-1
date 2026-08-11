import AuthForm from "@/components/AuthForm/AuthForm";

const registerFields = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Full name",
    placeholder: "Your full name",
    autoComplete: "name",
    required: true,
  },
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
    placeholder: "Create a password",
    autoComplete: "new-password",
    required: true,
  },
];

export default function RegisterForm() {
  return (
    <AuthForm
      title="Create an account"
      description="Enter your details to get started."
      fields={registerFields}
      submitLabel="Create account"
      footerText="Already have an account?"
      footerLink={{ href: "/login", label: "Sign in" }}
    />
  );
}
