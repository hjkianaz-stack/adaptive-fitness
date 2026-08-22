type Profile = {
  fitness_goal: string | null;
  training_days: number | null;
  experience_level: string | null;
  training_location: string | null;
};


type Props = {
  profile: Profile;
};



export default function RecommendationCard({
  profile,
}: Props) {


  const goal =
    profile.fitness_goal ?? "Build Muscle";


  const trainingDays =
    profile.training_days ?? 4;


  const experience =
    profile.experience_level ?? "Intermediate";


  const location =
    profile.training_location ?? "Gym";



  let recommendation = "";



  if (goal === "Build Muscle") {

    recommendation =
      "Focus on progressive overload, quality nutrition and consistent resistance training.";

  } else if (goal === "Lose Fat") {

    recommendation =
      "Maintain strength training while increasing daily activity and recovery quality.";

  } else if (goal === "Improve Fitness") {

    recommendation =
      "Balance strength, conditioning and recovery for better overall performance.";

  } else {

    recommendation =
      "Stay consistent and gradually increase workout difficulty.";

  }



  const items = [

    [
      "Weekly training",
      `${trainingDays} days`,
    ],

    [
      "Experience",
      experience,
    ],

    [
      "Goal",
      goal,
    ],

    [
      "Location",
      location,
    ],

  ];



  return (

    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">


      <p className="text-sm text-zinc-500">
        Recommendation
      </p>


      <h2 className="mt-2 text-xl font-bold text-white">
        Keep building momentum
      </h2>



      <p className="mt-4 text-sm leading-6 text-zinc-400">
        {recommendation}
      </p>




      <div className="mt-6 grid grid-cols-2 gap-3">


        {items.map(([label,value]) => (

          <div

            key={label}

            className="rounded-2xl bg-zinc-900 p-4"

          >

            <p className="text-xs text-zinc-500">
              {label}
            </p>


            <p className="mt-2 text-sm font-semibold text-white">
              {value}
            </p>


          </div>

        ))}


      </div>


    </section>

  );
}