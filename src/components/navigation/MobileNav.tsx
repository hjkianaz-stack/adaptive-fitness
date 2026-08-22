"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Home",
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

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      border-zinc-800
      bg-[#0b0b0b]
      lg:hidden
    ">

      <div className="
        mx-auto
        flex
        max-w-lg
        items-center
        justify-around
        px-2
        py-2
      ">

        {navigationItems.map((item) => {

          const isActive =
            pathname === item.href;


          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                min-w-16
                flex-col
                items-center
                gap-1
                rounded-xl
                px-3
                py-2
                text-xs
                font-medium
                transition-all

                ${
                  isActive
                    ? "bg-[#c7ff00] text-black"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                }
              `}
            >

              <span className="
                text-base
              ">
                {item.icon}
              </span>


              <span>
                {item.label}
              </span>


            </Link>

          );

        })}


      </div>

    </nav>
  );
}