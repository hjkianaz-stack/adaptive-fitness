"use client";

type CurrentPlanCardProps = {
  plan: {
    month: number;
    goal: string;
  } | null;
};


export default function CurrentPlanCard({
  plan,
}: CurrentPlanCardProps) {


  if (!plan) {

    return (

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">

        <h2 className="text-xl font-bold text-white">
          No Active Plan
        </h2>


        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Generate your monthly workout plan to start your personalized training.
        </p>


      </section>

    );

  }



  return (

    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <div className="flex items-start justify-between gap-4">


        <div>

          <h2 className="text-xl font-bold text-white">
            Active Monthly Plan
          </h2>


          <p className="mt-2 text-sm text-zinc-400">
            Your personalized coach-generated workout plan.
          </p>


        </div>



        <span className="rounded-full bg-[#c7ff00] px-3 py-1 text-xs font-bold text-black">

          Month {plan.month}

        </span>


      </div>




      <div className="mt-6 rounded-2xl bg-zinc-900 p-5">


        <p className="text-xs text-zinc-500">
          Goal
        </p>


        <p className="mt-2 text-lg font-semibold text-white">
          {plan.goal}
        </p>


      </div>


    </section>

  );
}