"use client";

import { useState } from "react";

import type { Exercise } from "@/data/exercises/types";

import {
  exerciseLibrary,
} from "@/data/exercises";

import {
  addExerciseToTodayWorkout,
} from "@/lib/plans/addExerciseToWorkout";



type AddExerciseButtonProps = {

  workoutType: string;

  onAdded?: (
    exercise: Exercise,
  ) => void;

};



function getRecommendedMuscles(
  workoutType: string,
): Exercise["muscleGroup"][] {


  switch (workoutType) {


    case "Lower Body":

    case "Legs":

      return [
        "Quadriceps",
        "Hamstrings",
        "Glutes",
        "Calves",
      ];



    case "Upper Body":

      return [
        "Chest",
        "Back",
        "Shoulders",
        "Biceps",
        "Triceps",
      ];



    case "Push":

      return [
        "Chest",
        "Shoulders",
        "Triceps",
      ];



    case "Pull":

      return [
        "Back",
        "Biceps",
        "Shoulders",
      ];



    case "Full Body":

      return [
        "Chest",
        "Back",
        "Quadriceps",
        "Hamstrings",
        "Shoulders",
        "Core",
      ];



    default:

      return [
        "Chest",
        "Back",
        "Shoulders",
      ];

  }

}



export default function AddExerciseButton({

  workoutType,

  onAdded,

}: AddExerciseButtonProps) {


  const [open, setOpen] =
    useState(false);


  const [saving, setSaving] =
    useState<string | null>(null);



  const [message, setMessage] =
    useState("");



  const recommendedMuscles =
    getRecommendedMuscles(
      workoutType,
    );



  const exercises =
    exerciseLibrary.filter(
      (exercise) =>
        recommendedMuscles.includes(
          exercise.muscleGroup,
        ),
    );



  async function handleAdd(
    exercise: Exercise,
  ) {


    try {

      setSaving(
        exercise.id,
      );

      setMessage("");



      await addExerciseToTodayWorkout(
        exercise,
      );



      setMessage(
        "Exercise added successfully",
      );


      onAdded?.(
        exercise,
      );



    } catch (error) {


      console.error(
        "Add exercise error:",
        error,
      );


      setMessage(
        "Unable to add exercise",
      );


    } finally {

      setSaving(null);

    }

  }



  return (

    <div className="mt-6">


      <button

        type="button"

        onClick={() =>
          setOpen(
            !open,
          )
        }

        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 bg-white py-4 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500 hover:bg-zinc-50"

      >

        <span className="text-xl">
          +
        </span>


        Add Exercise


      </button>



      {
        open && (

          <div className="mt-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">


            <h3 className="mb-4 text-base font-bold text-zinc-950">

              Recommended Exercises

            </h3>



            <div className="space-y-3">


              {
                exercises
                  .slice(
                    0,
                    12,
                  )
                  .map(
                    (exercise) => (

                      <button

                        key={
                          exercise.id
                        }


                        type="button"


                        disabled={
                          saving !== null
                        }


                        onClick={() =>
                          handleAdd(
                            exercise,
                          )
                        }


                        className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-left transition hover:bg-zinc-50 disabled:opacity-50"

                      >


                        <div>

                          <p className="text-sm font-semibold text-zinc-900">

                            {exercise.name}

                          </p>


                          <p className="mt-1 text-xs text-zinc-500">

                            {exercise.muscleGroup}
                            {" • "}
                            {exercise.equipment}

                          </p>

                        </div>



                        <span className="text-sm font-bold text-zinc-600">

                          {
                            saving === exercise.id
                              ? "..."
                              : "+"
                          }

                        </span>


                      </button>

                    ),
                  )

              }


            </div>



            {
              message && (

                <p className="mt-4 text-center text-sm text-zinc-500">

                  {message}

                </p>

              )
            }


          </div>

        )
      }


    </div>

  );

}