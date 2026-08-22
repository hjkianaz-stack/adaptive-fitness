import type { ReactNode } from "react";

import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";


type AppShellProps = {
  children: ReactNode;
};


export default function AppShell({
  children,
}: AppShellProps) {

  return (

    <div className="min-h-screen bg-[#050505] text-white">

      <div className="flex min-h-screen">


        <Sidebar />


        <div className="flex min-w-0 flex-1 flex-col">


          <main
            className="
            flex-1
            px-4
            py-6
            pb-28
            sm:px-6
            lg:px-10
            lg:pb-10
            "
          >

            {children}

          </main>


        </div>


      </div>


      <MobileNav />


    </div>

  );

}