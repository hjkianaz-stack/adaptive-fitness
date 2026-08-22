"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  WorkoutExercise,
  WorkoutSet,
} from "@/data/workout";

import {
  loadWorkoutProgress,
} from "@/lib/workoutProgress";

import {
  saveWorkoutLog,
} from "@/lib/workoutLog";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  workoutDate: string;
  onSetComplete?: (completed: boolean) => void;
};

export default function ExerciseCard({
  exercise,
  workoutDate,
  onSetComplete,
}: ExerciseCardProps) {
  const [sets, setSets] =
    useState<WorkoutSet[]>(exercise.sets);

  const [savingSet, setSavingSet] =
    useState<number | null>(null);

  const [loadingProgress, setLoadingProgress] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showInstructions, setShowInstructions] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  /*
   * Load saved workout progress
   */
  useEffect(() => {
    let cancelled = false;

    async function loadSavedProgress() {
      if (!workoutDate || !exercise.name) {
        setLoadingProgress(false);
        return;
      }

      try {
        setLoadingProgress(true);
        setError("");

        const progress =
          await loadWorkoutProgress(workoutDate);

        if (cancelled) {
          return;
        }

        const savedSets =
          progress.filter(
            (item) =>
              item.exerciseName === exercise.name,
          );

        if (savedSets.length === 0) {
          setSets(exercise.sets);
          return;
        }

        const restoredSets =
          exercise.sets.map((set) => {
            const saved =
              savedSets.find(
                (item) =>
                  item.setNumber === set.id,
              );

            if (!saved) {
              return set;
            }

            return {
              ...set,
              completed: saved.completed,
              actualWeight: saved.weight,
              actualReps: saved.reps,
            };
          });

        const existingIds =
          new Set(
            restoredSets.map(
              (set) => set.id,
            ),
          );

        const additionalSets =
          savedSets
            .filter(
              (saved) =>
                !existingIds.has(
                  saved.setNumber,
                ),
            )
            .map((saved) => ({
              id: saved.setNumber,
              targetReps: saved.reps,
              targetWeight: saved.weight,
              completed: saved.completed,
              actualWeight: saved.weight,
              actualReps: saved.reps,
            }));

        setSets([
          ...restoredSets,
          ...additionalSets,
        ]);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Workout progress loading failed:",
          loadError,
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load saved workout progress.",
        );

        setSets(exercise.sets);
      } finally {
        if (!cancelled) {
          setLoadingProgress(false);
        }
      }
    }

    loadSavedProgress();

    return () => {
      cancelled = true;
    };
  }, [
    workoutDate,
    exercise.name,
    exercise.sets,
  ]);

  /*
   * Reset image error whenever exercise changes
   */
  useEffect(() => {
    setImageError(false);
  }, [exercise.image]);

  /*
   * Update weight
   */
  const updateWeight = (
    setId: number,
    value: string,
  ) => {
    if (value === "") {
      setSets((current) =>
        current.map((set) =>
          set.id === setId
            ? {
                ...set,
                actualWeight: undefined,
              }
            : set,
        ),
      );

      return;
    }

    const weight = Number(value);

    if (
      !Number.isFinite(weight) ||
      weight < 0
    ) {
      return;
    }

    setSets((current) =>
      current.map((set) =>
        set.id === setId
          ? {
              ...set,
              actualWeight: weight,
            }
          : set,
      ),
    );
  };

  /*
   * Update reps
   */
  const updateReps = (
    setId: number,
    value: string,
  ) => {
    if (value === "") {
      setSets((current) =>
        current.map((set) =>
          set.id === setId
            ? {
                ...set,
                actualReps: undefined,
              }
            : set,
        ),
      );

      return;
    }

    const reps = Number(value);

    if (
      !Number.isFinite(reps) ||
      reps < 0
    ) {
      return;
    }

    setSets((current) =>
      current.map((set) =>
        set.id === setId
          ? {
              ...set,
              actualReps: reps,
            }
          : set,
      ),
    );
  };

  /*
   * Add set
   */
  const addSet = () => {
    setSets((current) => {
      const nextId =
        current.length > 0
          ? Math.max(
              ...current.map(
                (set) => set.id,
              ),
            ) + 1
          : 1;

      const previousSet =
        current[current.length - 1];

      return [
        ...current,
        {
          id: nextId,
          targetReps:
            previousSet?.targetReps ?? 10,
          targetWeight:
            previousSet?.targetWeight ?? 0,
          completed: false,
        },
      ];
    });
  };

  /*
   * Remove last set
   */
  const removeSet = () => {
    setSets((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.slice(0, -1);
    });
  };

  /*
   * Save / toggle set
   */
  const toggleSet = async (
    setId: number,
  ) => {
    const currentSet =
      sets.find(
        (set) => set.id === setId,
      );

    if (
      !currentSet ||
      savingSet !== null
    ) {
      return;
    }

    setError("");
    setSavingSet(setId);

    const willComplete =
      !currentSet.completed;

    const weight =
      currentSet.actualWeight ??
      currentSet.targetWeight;

    const reps =
      currentSet.actualReps ??
      currentSet.targetReps;

    try {
      if (!workoutDate) {
        throw new Error(
          "Workout date is missing.",
        );
      }

      if (!exercise.name) {
        throw new Error(
          "Exercise name is missing.",
        );
      }

      await saveWorkoutLog({
        workoutDate,
        exerciseName: exercise.name,
        muscle: exercise.muscle,
        setNumber: currentSet.id,
        weight,
        reps,
        completed: willComplete,
      });

      setSets((current) =>
        current.map((set) =>
          set.id === setId
            ? {
                ...set,
                completed: willComplete,
                actualWeight: weight,
                actualReps: reps,
              }
            : set,
        ),
      );

      onSetComplete?.(
        willComplete,
      );
    } catch (saveError) {
      console.error(
        "Workout set save failed:",
        saveError,
      );

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save this set. Please try again.",
      );
    } finally {
      setSavingSet(null);
    }
  };

  const completedSets =
    sets.filter(
      (set) => set.completed,
    ).length;

  const progress =
    sets.length > 0
      ? (completedSets / sets.length) *
        100
      : 0;

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-[#111111]
        shadow-sm
      "
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          h-56
          w-full
          overflow-hidden
          bg-zinc-900
          sm:h-72
        "
      >
        {exercise.image && !imageError ? (
          <img
            src={exercise.image}
            alt={`${exercise.name} exercise demonstration`}
            className="
              absolute
              inset-0
              z-0
              block
              h-full
              w-full
              object-cover
              object-center
            "
            onError={() => {
              console.error(
                "Exercise image failed to load:",
                exercise.image,
              );

              setImageError(true);
            }}
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              z-0
              flex
              items-center
              justify-center
              bg-zinc-900
              text-sm
              text-zinc-600
            "
          >
            {imageError
              ? "Unable to load exercise image"
              : "No exercise image"}
          </div>
        )}

        {/* IMAGE GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-10
            h-40
            bg-gradient-to-t
            from-black
            via-black/60
            to-transparent
          "
        />

        {/* EXERCISE NAME */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            z-20
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            {exercise.name}
          </h2>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-5 sm:p-6">

        {/* INFORMATION */}

        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <InfoItem
            label="Primary muscle"
            value={exercise.muscle}
          />

          <InfoItem
            label="Equipment"
            value={exercise.equipment}
          />

          <InfoItem
            label="Difficulty"
            value={exercise.difficulty}
          />

          <InfoItem
            label="Rest"
            value={`${exercise.restSeconds}s`}
          />
        </div>

        {/* SECONDARY MUSCLES */}

        {exercise.secondaryMuscles?.length > 0 && (
          <div className="mt-5">
            <p
              className="
                mb-2
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-500
              "
            >
              Secondary muscles
            </p>

            <div className="flex flex-wrap gap-2">
              {exercise.secondaryMuscles.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="
                      rounded-full
                      border
                      border-zinc-800
                      bg-zinc-900
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-zinc-300
                    "
                  >
                    {muscle}
                  </span>
                ),
              )}
            </div>
          </div>
        )}

        {/* INSTRUCTIONS */}

        {exercise.instructions?.length > 0 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() =>
                setShowInstructions(
                  (value) => !value,
                )
              }
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-4
                py-3
                text-left
                transition
                hover:border-zinc-700
              "
            >
              <span
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                How to perform
              </span>

              <span
                className="
                  text-lg
                  text-zinc-500
                "
              >
                {showInstructions
                  ? "−"
                  : "+"}
              </span>
            </button>

            {showInstructions && (
              <ol
                className="
                  mt-3
                  space-y-3
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-[#0d0d0d]
                  p-4
                "
              >
                {exercise.instructions.map(
                  (
                    instruction,
                    index,
                  ) => (
                    <li
                      key={`${exercise.id}-instruction-${index}`}
                      className="
                        flex
                        gap-3
                        text-sm
                        leading-6
                        text-zinc-400
                      "
                    >
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-zinc-800
                          text-xs
                          font-semibold
                          text-[#c7ff00]
                        "
                      >
                        {index + 1}
                      </span>

                      <span>
                        {instruction}
                      </span>
                    </li>
                  ),
                )}
              </ol>
            )}
          </div>
        )}

        {/* PERFORMANCE */}

        <div className="mt-6">
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <div>
              <h3
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Performance
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-zinc-500
                "
              >
                Enter the weight and reps
                for each set.
              </p>
            </div>

            <span
              className="
                text-xs
                text-zinc-500
              "
            >
              {completedSets}/{sets.length} done
            </span>
          </div>

          {/* LOADING */}

          {loadingProgress && (
            <div
              className="
                mb-4
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/60
                px-4
                py-3
                text-xs
                text-zinc-500
              "
            >
              Loading saved progress...
            </div>
          )}

          {/* SET CONTROLS */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/60
              px-4
              py-3
            "
          >
            <div>
              <p
                className="
                  text-xs
                  text-zinc-500
                "
              >
                Number of sets
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {sets.length} sets
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={removeSet}
                disabled={
                  sets.length <= 1 ||
                  loadingProgress
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-900
                  text-lg
                  text-white
                  transition
                  hover:border-zinc-500
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="Remove set"
              >
                −
              </button>

              <span
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-zinc-800
                  px-2
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {sets.length}
              </span>

              <button
                type="button"
                onClick={addSet}
                disabled={loadingProgress}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#c7ff00]
                  text-lg
                  font-bold
                  text-black
                  transition
                  hover:bg-[#d4ff4d]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                aria-label="Add set"
              >
                +
              </button>
            </div>
          </div>

          {/* TABLE */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
            "
          >
            <div
              className="
                grid
                grid-cols-[42px_1fr_1fr_58px]
                gap-2
                border-b
                border-zinc-800
                bg-zinc-900
                px-3
                py-3
                text-xs
                font-semibold
                text-zinc-500
                sm:grid-cols-[56px_1fr_1fr_72px]
                sm:px-4
              "
            >
              <span>Set</span>
              <span>Weight</span>
              <span>Reps</span>

              <span className="text-center">
                Done
              </span>
            </div>

            <div className="divide-y divide-zinc-900">
              {sets.map((set) => {
                const isSaving =
                  savingSet === set.id;

                return (
                  <div
                    key={set.id}
                    className={`
                      grid
                      grid-cols-[42px_1fr_1fr_58px]
                      items-center
                      gap-2
                      px-3
                      py-3
                      transition
                      sm:grid-cols-[56px_1fr_1fr_72px]
                      sm:px-4
                      ${
                        set.completed
                          ? "bg-[#c7ff00]/[0.04]"
                          : ""
                      }
                    `}
                  >
                    <span
                      className="
                        text-sm
                        font-semibold
                        text-zinc-400
                      "
                    >
                      {set.id}
                    </span>

                    {/* WEIGHT */}

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        inputMode="decimal"
                        value={
                          set.actualWeight ??
                          set.targetWeight
                        }
                        onChange={(event) =>
                          updateWeight(
                            set.id,
                            event.target.value,
                          )
                        }
                        disabled={
                          isSaving ||
                          loadingProgress
                        }
                        aria-label={`Weight for set ${set.id}`}
                        className="
                          h-10
                          w-full
                          rounded-xl
                          border
                          border-zinc-800
                          bg-zinc-900
                          px-3
                          pr-8
                          text-sm
                          font-medium
                          text-white
                          outline-none
                          transition
                          focus:border-[#c7ff00]
                          disabled:opacity-50
                        "
                      />

                      <span
                        className="
                          pointer-events-none
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-xs
                          text-zinc-600
                        "
                      >
                        kg
                      </span>
                    </div>

                    {/* REPS */}

                    <input
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      value={
                        set.actualReps ??
                        set.targetReps
                      }
                      onChange={(event) =>
                        updateReps(
                          set.id,
                          event.target.value,
                        )
                      }
                      disabled={
                        isSaving ||
                        loadingProgress
                      }
                      aria-label={`Reps for set ${set.id}`}
                      className="
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-900
                        px-3
                        text-sm
                        font-medium
                        text-white
                        outline-none
                        transition
                        focus:border-[#c7ff00]
                        disabled:opacity-50
                      "
                    />

                    {/* DONE */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleSet(set.id)
                      }
                      disabled={
                        savingSet !== null ||
                        loadingProgress
                      }
                      aria-label={
                        set.completed
                          ? `Mark set ${set.id} as incomplete`
                          : `Complete set ${set.id}`
                      }
                      className={`
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        text-sm
                        font-bold
                        transition
                        ${
                          set.completed
                            ? "border-[#c7ff00] bg-[#c7ff00] text-black"
                            : "border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-500 hover:text-white"
                        }
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      `}
                    >
                      {isSaving
                        ? "..."
                        : set.completed
                          ? "✓"
                          : ""}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-red-900/50
              bg-red-950/40
              px-4
              py-3
              text-sm
              text-red-400
            "
            role="alert"
          >
            {error}
          </div>
        )}

        {/* PROGRESS */}

        <div className="mt-5">
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >
            <p
              className="
                text-sm
                text-zinc-500
              "
            >
              {completedSets} of {sets.length} sets
              completed
            </p>

            <span
              className="
                text-xs
                font-medium
                text-zinc-500
              "
            >
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-zinc-800
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#c7ff00]
                transition-all
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INFO ITEM ================= */

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/50
        p-4
      "
    >
      <p
        className="
          text-xs
          text-zinc-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}