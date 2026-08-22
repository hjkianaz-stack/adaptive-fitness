"use client";

type NutritionPreferencesProps = {
  editable?: boolean;
  data: {
    dietPreference: string;
    dailyMeals: string;
    waterGoal: string;
  };
  onChange: (
    field: keyof NutritionPreferencesProps["data"],
    value: string
  ) => void;
};


export default function NutritionPreferences({
  editable = false,
  data,
  onChange,
}: NutritionPreferencesProps) {


  const selectClass = editable
    ? "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-[#c7ff00]"
    : "w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400 outline-none";



  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <div className="mb-6">

        <h2 className="text-lg font-bold text-white">
          Nutrition Preferences
        </h2>


        <p className="mt-1 text-sm text-zinc-500">
          Manage your nutrition targets and daily habits.
        </p>


      </div>




      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Diet Preference
          </label>


          <select
            value={data.dietPreference}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "dietPreference",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              Balanced
            </option>

            <option>
              High Protein
            </option>

            <option>
              Low Carb
            </option>

            <option>
              Vegetarian
            </option>


          </select>

        </div>





        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Daily Meals
          </label>


          <select
            value={data.dailyMeals}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "dailyMeals",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option value="3">
              3 meals
            </option>

            <option value="4">
              4 meals
            </option>

            <option value="5">
              5 meals
            </option>

            <option value="6">
              6 meals
            </option>

          </select>

        </div>





        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Water Goal
          </label>


          <select
            value={data.waterGoal}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "waterGoal",
                event.target.value
              )
            }
            className={selectClass}
          >

            <option>
              1.5 L
            </option>

            <option>
              2 L
            </option>

            <option>
              2.5 L
            </option>

            <option>
              3 L
            </option>

            <option>
              3.5 L
            </option>


          </select>


        </div>


      </div>


    </section>
  );
}