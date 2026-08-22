"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  signIn,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } =
      await signIn(
        email,
        password,
      );

    if (error) {
      setError(
        error.message,
      );

      setLoading(false);

      return;
    }

    router.push(
      "/dashboard",
    );
  }

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
        px-4
      "
    >
      <section
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-zinc-950
          p-8
          shadow-xl
        "
      >
        <div className="mb-8">
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-zinc-400
            "
          >
            Sign in to continue your fitness journey.
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-zinc-400
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="
                w-full
                rounded-xl
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-[#c7ff00]
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                text-zinc-400
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="
                w-full
                rounded-xl
                bg-zinc-900
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-[#c7ff00]
              "
            />
          </div>

          {error && (
            <div
              className="
                rounded-xl
                bg-red-950
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-[#c7ff00]
              py-3
              font-bold
              text-black
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <p
          className="
            mt-6
            text-center
            text-sm
            text-zinc-500
          "
        >
          Don&apos;t have an account?

          <button
            type="button"
            onClick={() =>
              router.push(
                "/signup",
              )
            }
            className="
              ml-2
              font-semibold
              text-[#c7ff00]
            "
          >
            Create one
          </button>
        </p>
      </section>
    </main>
  );
}