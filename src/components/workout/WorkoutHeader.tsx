type WorkoutHeaderProps = {
  title: string;
  subtitle: string;
};

export default function WorkoutHeader({
  title,
  subtitle,
}: WorkoutHeaderProps) {
  return (
    <header className="mb-6">

      <p className="mb-2 text-sm font-medium text-zinc-500">
        Today&apos;s training
      </p>


      <h1 className="
        text-3xl
        font-bold
        tracking-tight
        text-white
        sm:text-4xl
      ">
        {title}
      </h1>


      <p className="
        mt-2
        text-sm
        text-zinc-400
        sm:text-base
      ">
        {subtitle}
      </p>


    </header>
  );
}