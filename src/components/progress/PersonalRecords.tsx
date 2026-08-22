import type { PersonalRecord } from "@/data/progress";

type PersonalRecordsProps = {
  records: PersonalRecord[];
};

export default function PersonalRecords({
  records,
}: PersonalRecordsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">
          Personal records
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Your best recorded performances.
        </p>
      </div>


      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="divide-y divide-zinc-800">

          {records.map((record) => (

            <div
              key={record.exercise}
              className="flex items-center justify-between gap-4 p-5 sm:p-6"
            >

              <div>

                <p className="font-semibold text-white">
                  {record.exercise}
                </p>


                <p className="mt-1 text-xs text-zinc-500">
                  Recorded {record.date}
                </p>

              </div>



              <div className="text-right">

                <p className="text-lg font-bold text-[#c7ff00]">
                  {record.value} {record.unit}
                </p>


                <p className="text-xs text-zinc-500">
                  Personal best
                </p>

              </div>

            </div>

          ))}

        </div>
      </div>

    </section>
  );
}