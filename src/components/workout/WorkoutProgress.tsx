type WorkoutProgressProps = {
  completedSets: number;
  totalSets: number;
};

export default function WorkoutProgress({
  completedSets,
  totalSets,
}: WorkoutProgressProps) {

  const percentage =
    totalSets === 0
      ? 0
      : Math.round(
          (completedSets / totalSets) * 100,
        );


  return (
    <section
      className="
        mb-8
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-5
      "
    >

      <div className="
        mb-3
        flex
        items-center
        justify-between
        gap-4
      ">

        <div>

          <p className="
            text-sm
            font-semibold
            text-white
          ">
            Workout progress
          </p>


          <p className="
            mt-1
            text-xs
            text-zinc-500
          ">
            {completedSets} of {totalSets} sets completed
          </p>


        </div>



        <span className="
          text-sm
          font-bold
          text-[#c7ff00]
        ">
          {percentage}%
        </span>


      </div>



      <div className="
        h-2
        overflow-hidden
        rounded-full
        bg-zinc-800
      ">

        <div
          className="
            h-full
            rounded-full
            bg-[#c7ff00]
            transition-all
          "
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>


    </section>
  );
}