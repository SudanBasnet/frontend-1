export default function LoginForm() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl shadow-black/40">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
            B
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Enter your details to access your account.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-200"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-zinc-400">
            <input
              name="remember"
              type="checkbox"
              className="size-4 rounded border-zinc-700 accent-blue-600"
            />
            Remember me
          </label>

          <button
            type="button"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Create an account
          </button>
        </p>
      </div>
    </section>
  );
}
