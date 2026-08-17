"use client";

import { useState } from "react";

import type { WorkoutExercise } from "@/data/workout";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
};

export default function ExerciseCard({
  exercise,
}: ExerciseCardProps) {
  const [sets, setSets] = useState(exercise.sets);

  const completedSets = sets.filter((set) => set.completed).length;

  const toggleSet = (setId: number) => {
    setSets((currentSets) =>
      currentSets.map((set) =>
        set.id === setId
          ? {
              ...set,
              completed: !set.completed,
              actualReps: !set.completed
                ? set.targetReps
                : undefined,
              actualWeight: !set.completed
                ? set.targetWeight
                : undefined,
            }
          : set,
      ),
    );
  };

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 sm:text-xl">
            {exercise.name}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
              {exercise.muscle}
            </span>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
              {exercise.equipment}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Rest</p>

          <p className="mt-1 text-sm font-semibold text-zinc-800">
            {exercise.restSeconds}s
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200">
        <div className="grid grid-cols-[48px_1fr_1fr_64px] items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-3 text-xs font-semibold text-zinc-500 sm:grid-cols-[56px_1fr_1fr_80px] sm:px-4">
          <span>Set</span>
          <span>Weight</span>
          <span>Reps</span>
          <span className="text-right">Done</span>
        </div>

        <div className="divide-y divide-zinc-100">
          {sets.map((set) => (
            <div
              key={set.id}
              className="grid grid-cols-[48px_1fr_1fr_64px] items-center gap-2 px-3 py-3 sm:grid-cols-[56px_1fr_1fr_80px] sm:px-4"
            >
              <span className="text-sm font-semibold text-zinc-700">
                {set.id}
              </span>

              <span className="text-sm font-medium text-zinc-900">
                {set.targetWeight} kg
              </span>

              <span className="text-sm font-medium text-zinc-900">
                {set.targetReps}
              </span>

              <button
                type="button"
                onClick={() => toggleSet(set.id)}
                aria-label={`Mark set ${set.id} as ${
                  set.completed ? "incomplete" : "complete"
                }`}
                className={`ml-auto flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold transition ${
                  set.completed
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-400"
                }`}
              >
                {set.completed ? "✓" : ""}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {completedSets} of {sets.length} sets completed
        </p>

        <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-zinc-950 transition-all"
            style={{
              width: `${(completedSets / sets.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}