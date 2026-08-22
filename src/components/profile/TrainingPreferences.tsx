"use client";

type TrainingPreferencesProps = {
  editable?: boolean;
  data: {
    trainingDays: string;
    sessionDuration: string;
    trainingLocation: string;
    experienceLevel: string;
  };
  onChange: (
    field: keyof TrainingPreferencesProps["data"],
    value: string
  ) => void;
};


export default function TrainingPreferences({
  editable = false,
  data,
  onChange,
}: TrainingPreferencesProps) {


  const selectClass = editable
    ? "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-[#c7ff00]"
    : "w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400 outline-none";


  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <div className="mb-6">

        <h2 className="text-lg font-bold text-white">
          Training Preferences
        </h2>


        <p className="mt-1 text-sm text-zinc-500">
          Customize your training environment and schedule.
        </p>

      </div>



      <div className="grid gap-5 sm:grid-cols-2">


        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Training Days
          </label>


          <select
            value={data.trainingDays}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "trainingDays",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              2 days/week
            </option>

            <option>
              3 days/week
            </option>

            <option>
              4 days/week
            </option>

            <option>
              5 days/week
            </option>

            <option>
              6 days/week
            </option>

          </select>

        </div>




        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Session Duration
          </label>


          <select
            value={data.sessionDuration}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "sessionDuration",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              30 min
            </option>

            <option>
              45 min
            </option>

            <option>
              60 min
            </option>

            <option>
              75 min
            </option>

            <option>
              90 min
            </option>


          </select>


        </div>




        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Training Location
          </label>


          <select
            value={data.trainingLocation}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "trainingLocation",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              Gym
            </option>

            <option>
              Home
            </option>

            <option>
              Outdoor
            </option>

          </select>


        </div>





        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Experience Level
          </label>


          <select
            value={data.experienceLevel}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "experienceLevel",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              Beginner
            </option>

            <option>
              Intermediate
            </option>

            <option>
              Advanced
            </option>

          </select>


        </div>


      </div>


    </section>
  );
}