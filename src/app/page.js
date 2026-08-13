import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1 className="text-4xl font-bold">Landing Page</h1>
      <div className="flex justify-center gap-4 ">
        <Link
          href="/about"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Contact
        </Link>
        <Link
          href="/blogs"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Blogs
        </Link>
        <Link
          href="/login"
          className="inline-block rounded bg-red-600 px-4 py-2 text-white"
        >
          Login Page
        </Link>
        <Link
          href="/register"
          className="inline-block rounded bg-emerald-600 px-4 py-2 text-white"
        >
          Register Page
        </Link>
      </div>
    </section>
  );
}
