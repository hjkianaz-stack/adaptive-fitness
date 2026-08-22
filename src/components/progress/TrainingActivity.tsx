import type { TrainingActivityItem } from "@/data/progress";


type TrainingActivityProps = {
  activity: TrainingActivityItem[];
};


export default function TrainingActivity({
  activity,
}: TrainingActivityProps) {


  const completedCount =
    activity.filter(
      (item)=>item.completed,
    ).length;


  return (

    <section className="mb-8">


      <div className="mb-4 flex items-end justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Training activity
          </h2>


          <p className="mt-1 text-sm text-zinc-500">
            Your workout consistency this week.
          </p>

        </div>


        <span className="text-sm font-bold text-[#c7ff00]">
          {completedCount}/{activity.length}
        </span>

      </div>



      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl">


        <div className="grid grid-cols-7 gap-3">

          {activity.map((item)=>(

            <div
              key={item.date}
              className="flex flex-col items-center gap-2"
            >

              <span className="text-xs text-zinc-500">
                {item.day}
              </span>


              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold ${
                  item.completed
                    ? "border-[#c7ff00] bg-[#c7ff00] text-black"
                    : "border-zinc-800 bg-zinc-900 text-zinc-600"
                }`}
              >

                {item.completed ? "✓" : "—"}

              </div>


            </div>

          ))}

        </div>


      </div>


    </section>

  );
}