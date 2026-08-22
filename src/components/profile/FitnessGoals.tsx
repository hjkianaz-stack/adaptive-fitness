"use client";

type FitnessGoalsProps = {
  editable?: boolean;
  selectedGoal: string;
  onChange: (goal: string) => void;
};

const goals = [
  "Build Muscle",
  "Lose Fat",
  "Maintain Weight",
  "Improve Strength",
  "Improve Fitness",
];


export default function FitnessGoals({
  editable = false,
  selectedGoal,
  onChange,
}: FitnessGoalsProps) {

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <div className="mb-6">

        <h2 className="text-lg font-bold text-white">
          Fitness Goals
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Choose your current training objective.
        </p>

      </div>



      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">


        {goals.map((goal) => {

          const selected =
            selectedGoal === goal;


          return (

            <button
              key={goal}
              type="button"
              disabled={!editable}
              onClick={() => onChange(goal)}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-[#c7ff00] bg-[#c7ff00] text-black"
                  : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
              }`}
            >

              <div className="flex justify-between">

                <span className="text-sm font-semibold">
                  {goal}
                </span>


                {selected && (
                  <span className="text-xs font-bold">
                    ✓
                  </span>
                )}

              </div>


            </button>

          );

        })}


      </div>


    </section>
  );
}