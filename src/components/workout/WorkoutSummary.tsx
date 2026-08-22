type WorkoutSummaryProps = {
  duration: number;
  exerciseCount: number;
};


export default function WorkoutSummary({
  duration,
  exerciseCount,
}: WorkoutSummaryProps) {

  return (
    <div className="
      mb-8
      grid
      grid-cols-2
      gap-3
      sm:grid-cols-3
    ">


      <div className="
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-4
      ">

        <p className="text-xs font-medium text-zinc-500">
          Duration
        </p>


        <p className="
          mt-2
          text-xl
          font-bold
          text-white
        ">
          {duration} min
        </p>


      </div>



      <div className="
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-4
      ">

        <p className="text-xs font-medium text-zinc-500">
          Exercises
        </p>


        <p className="
          mt-2
          text-xl
          font-bold
          text-white
        ">
          {exerciseCount}
        </p>


      </div>




      <div className="
        col-span-2
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-4
        sm:col-span-1
      ">

        <p className="text-xs font-medium text-zinc-500">
          Status
        </p>


        <p className="
          mt-2
          text-xl
          font-bold
          text-[#c7ff00]
        ">
          Ready
        </p>


      </div>


    </div>
  );
}