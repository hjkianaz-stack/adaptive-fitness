"use client";

import { useMemo } from "react";

import ExerciseCard from "@/components/workout/ExerciseCard";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import WorkoutProgress from "@/components/workout/WorkoutProgress";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import { workoutData } from "@/data/workout";

export default function WorkoutPage() {
  const totalSets = useMemo(
    () =>
      workoutData.exercises.reduce(
        (total, exercise) => total + exercise.sets.length,
        0,
      ),
    [],
  );

  const completedSets = 0;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <WorkoutHeader
        title={workoutData.title}
        subtitle={workoutData.subtitle}
      />

      <WorkoutSummary
        duration={workoutData.duration}
        exerciseCount={workoutData.exercises.length}
      />

      <WorkoutProgress
        completedSets={completedSets}
        totalSets={totalSets}
      />

      <div className="space-y-5">
        {workoutData.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}