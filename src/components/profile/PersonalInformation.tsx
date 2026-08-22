"use client";

type PersonalInformationProps = {
  editable?: boolean;
  data: {
    fullName: string;
    email: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
  };
  onChange: (
    field: keyof PersonalInformationProps["data"],
    value: string
  ) => void;
};

export default function PersonalInformation({
  editable = false,
  data,
  onChange,
}: PersonalInformationProps) {

  const fields = [
    {
      key: "fullName" as const,
      label: "Full Name",
      type: "text",
    },
    {
      key: "email" as const,
      label: "Email",
      type: "email",
    },
    {
      key: "age" as const,
      label: "Age",
      type: "number",
    },
    {
      key: "height" as const,
      label: "Height",
      type: "number",
      suffix: "cm",
    },
    {
      key: "weight" as const,
      label: "Weight",
      type: "number",
      suffix: "kg",
    },
  ];


  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Your basic personal information.
        </p>
      </div>


      <div className="grid gap-5 sm:grid-cols-2">

        {fields.map((field) => (

          <div key={field.key}>

            <label className="mb-2 block text-sm font-medium text-zinc-400">
              {field.label}
            </label>


            <div className="relative">

              <input
                type={field.type}
                value={data[field.key]}
                disabled={!editable}
                onChange={(event) =>
                  onChange(
                    field.key,
                    event.target.value
                  )
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  editable
                    ? "border-zinc-700 bg-zinc-900 text-white focus:border-[#c7ff00]"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400"
                } ${field.suffix ? "pr-14" : ""}`}
              />


              {field.suffix && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  {field.suffix}
                </span>
              )}

            </div>

          </div>

        ))}



        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Gender
          </label>


          <select
            value={data.gender}
            disabled={!editable}
            onChange={(event) =>
              onChange(
                "gender",
                event.target.value
              )
            }
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${
              editable
                ? "border-zinc-700 bg-zinc-900 text-white"
                : "border-zinc-800 bg-zinc-900 text-zinc-400"
            }`}
          >

            <option value="Female">
              Female
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Other">
              Other
            </option>

            <option value="Prefer not to say">
              Prefer not to say
            </option>

          </select>

        </div>


      </div>

    </section>
  );
}