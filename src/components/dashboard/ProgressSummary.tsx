type Profile = {
  weight_kg: number | null;
  height_cm: number | null;
  training_days: number | null;
  session_duration: number | null;
};


type Props = {
  profile: Profile;
};


export default function ProgressSummary({
  profile,
}: Props) {


  const stats = [

    {
      label:"Weight",
      value: profile.weight_kg
        ? `${profile.weight_kg} kg`
        : "—",
    },

    {
      label:"Height",
      value: profile.height_cm
        ? `${profile.height_cm} cm`
        : "—",
    },

    {
      label:"Training",
      value: profile.training_days
        ? `${profile.training_days}/week`
        : "—",
    },

    {
      label:"Session",
      value: profile.session_duration
        ? `${profile.session_duration} min`
        : "—",
    },

  ];



  return (

    <section>


      <div className="mb-4">

        <h2 className="text-xl font-bold text-white">
          Your Progress
        </h2>


        <p className="mt-1 text-sm text-zinc-500">
          Overview of your fitness profile.
        </p>

      </div>



      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {stats.map((item)=>(

          <div
            key={item.label}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
          >

            <p className="text-sm text-zinc-500">
              {item.label}
            </p>


            <p className="mt-3 text-2xl font-bold text-white">
              {item.value}
            </p>


          </div>

        ))}

      </div>


    </section>

  );
}