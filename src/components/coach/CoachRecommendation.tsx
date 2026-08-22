"use client";

import type {
  CoachRecommendation as CoachData,
} from "@/data/coach/coachEngine";


type Props = {
  recommendation: CoachData;
};



export default function CoachRecommendation({
  recommendation,
}: Props) {


  return (

    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <h2 className="text-xl font-bold text-white">

        {recommendation.title}

      </h2>



      <p className="mt-3 text-sm leading-6 text-zinc-400">

        {recommendation.message}

      </p>



      <div className="mt-6 space-y-3">


        {recommendation.actions.map(
          (action) => (

            <div

              key={action}

              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300"

            >

              {action}

            </div>

          ),
        )}


      </div>


    </section>

  );
}