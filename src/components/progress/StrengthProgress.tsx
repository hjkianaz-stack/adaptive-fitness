import type { StrengthProgressItem } from "@/data/progress";

type StrengthProgressProps = {
  items: StrengthProgressItem[];
};

export default function StrengthProgress({
  items,
}: StrengthProgressProps) {

  return (
    <section className="mb-8">

      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          Strength progress
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          How your main lifts have improved over time.
        </p>
      </div>


      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 shadow-xl">

        <div className="divide-y divide-zinc-800">

          {items.map((item)=>{

            const increase =
              item.currentWeight - item.startWeight;


            const percentage =
              item.startWeight === 0
                ? 0
                : Math.round(
                    (increase / item.startWeight) * 100,
                  );


            const progressWidth =
              Math.min(
                Math.max(percentage * 3,12),
                100,
              );


            return (

              <div
                key={item.exercise}
                className="p-5 sm:p-6"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

                  <div>

                    <h3 className="font-semibold text-white">
                      {item.exercise}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      {item.muscle}
                    </p>

                  </div>


                  <div className="flex items-center gap-3">

                    <span className="text-sm text-zinc-500">
                      {item.startWeight} {item.unit}
                    </span>


                    <span className="text-zinc-700">
                      →
                    </span>


                    <span className="text-sm font-bold text-white">
                      {item.currentWeight} {item.unit}
                    </span>


                    <span className="rounded-full bg-[#c7ff00]/10 px-3 py-1 text-xs font-bold text-[#c7ff00]">
                      +{percentage}%
                    </span>

                  </div>

                </div>


                <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-[#c7ff00]"
                    style={{
                      width:`${progressWidth}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}