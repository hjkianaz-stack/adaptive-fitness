"use client";

type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({
  name,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-500">
          Good morning
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          {name} 👋
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Ready for today&apos;s workout?
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 sm:block">
          <p className="text-xs text-zinc-500">
            Streak
          </p>

          <p className="mt-1 text-lg font-bold text-[#c7ff00]">
            🔥 12
          </p>
        </div>

        <button
          type="button"
          aria-label="Open profile"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-zinc-700
            bg-zinc-900
            text-sm
            font-bold
            text-white
          "
        >
          {name.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  );
}