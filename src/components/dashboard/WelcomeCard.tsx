type Profile = {
  full_name: string | null;
  fitness_goal: string | null;
};


type Props = {
  profile: Profile;
};


export default function WelcomeCard({
  profile,
}: Props) {


  const name =
    profile.full_name?.split(" ")[0] || "Athlete";


  const goal =
    profile.fitness_goal || "Build Muscle";



  return (

    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-7 shadow-xl">


      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#c7ff00]/10 blur-3xl" />


      <div className="relative z-10">


        <p className="text-sm font-medium text-zinc-500">
          Welcome back
        </p>



        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {name} 👋
        </h1>



        <p className="mt-3 max-w-lg text-sm text-zinc-400">
          Your AI coach has prepared today&apos;s workout based on your progress.
        </p>



        <div className="mt-6 flex flex-wrap gap-3">


          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">

            <p className="text-xs text-zinc-500">
              Current Goal
            </p>

            <p className="mt-1 text-sm font-bold text-[#c7ff00]">
              {goal}
            </p>

          </div>



          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">

            <p className="text-xs text-zinc-500">
              Streak
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              🔥 12 Days
            </p>

          </div>



          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">

            <p className="text-xs text-zinc-500">
              Status
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Active
            </p>

          </div>


        </div>


      </div>


    </section>

  );

}