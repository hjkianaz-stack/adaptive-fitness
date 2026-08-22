type ProfileHeaderProps = {
  name: string;
  email: string;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ProfileHeader({
  name,
  email,
  editing,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {

  const displayName = name || "User";

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c7ff00] text-xl font-bold text-black">
            {displayName.charAt(0).toUpperCase()}
          </div>


          <div>

            <h1 className="text-2xl font-bold text-white">
              {displayName}
            </h1>


            <p className="mt-1 text-sm text-zinc-400">
              {email}
            </p>


            <p className="mt-2 text-sm text-zinc-500">
              Your fitness journey, all in one place.
            </p>

          </div>

        </div>


        <div className="flex gap-3">

          {editing ? (
            <>
              <button
                onClick={onCancel}
                className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300"
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className="rounded-xl bg-[#c7ff00] px-5 py-2.5 text-sm font-bold text-black"
              >
                Save Changes
              </button>
            </>
          ) : (

            <button
              onClick={onEdit}
              className="rounded-xl bg-[#c7ff00] px-5 py-2.5 text-sm font-bold text-black"
            >
              Edit Profile
            </button>

          )}

        </div>

      </div>

    </section>
  );
}