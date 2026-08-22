import Link from "next/link";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Workout",
    href: "/workout",
    icon: "◈",
  },
  {
    label: "Progress",
    href: "/progress",
    icon: "↗",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "○",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-zinc-800 bg-[#0b0b0b] px-5 py-6 lg:flex">
      <div className="mb-10">
        <div className="text-xl font-bold tracking-tight text-white">
          FitPilot
        </div>

        <div className="mt-1 text-sm text-zinc-500">
          AI powered fitness system
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm font-medium
              text-zinc-400
              transition-all
              hover:bg-zinc-900
              hover:text-[#c7ff00]
            "
          >
            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-lg
                bg-zinc-900
                text-base
                text-zinc-300
              "
            >
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div
        className="
          mt-auto
          rounded-2xl
          border
          border-zinc-800
          bg-[#111111]
          p-4
        "
      >
        <div className="text-sm font-semibold text-white">
          Adaptive Training
        </div>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Your program evolves with your performance.
        </p>
      </div>
    </aside>
  );
}