import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to FitPilot
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Your personalized fitness journey starts here.
          Build muscle, track workouts and improve every week.
        </p>


        <div className="mt-8 space-y-3">

          <Link
            href="/signup"
            className="
              block
              rounded-xl
              bg-gray-900
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Create Account
          </Link>


          <Link
            href="/login"
            className="
              block
              rounded-xl
              border
              border-gray-200
              px-5
              py-3
              text-sm
              font-medium
              text-gray-900
              transition
              hover:bg-gray-50
            "
          >
            Already have an account?
          </Link>

        </div>

      </section>
    </main>
  );
}