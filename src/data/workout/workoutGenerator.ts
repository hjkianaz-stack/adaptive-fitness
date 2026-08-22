import type {
  WeeklyWorkoutPlan,
  WorkoutDay,
  WorkoutDayType,
} from "./types";

import { buildWorkoutDay } from "./workoutBuilder";

import { calculateWeeklyVolume } from "./volumeEngine";


export type WorkoutProfile = {
  fitness_goal: string | null;

  training_days: number | null;

  session_duration: number | null;

  experience_level: string | null;

  training_location: string | null;

  age: number | null;

  height_cm: number | null;

  weight_kg: number | null;

  body_fat: number | null;

  training_experience_months: number | null;

  injury_notes: string | null;

  split_preference:
    | "upper_lower"
    | "push_pull_legs"
    | "full_body"
    | null;

  upper_body_days: number | null;

  lower_body_days: number | null;
};


/*
|--------------------------------------------------------------------------
| Week days
|--------------------------------------------------------------------------
*/

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


/*
|--------------------------------------------------------------------------
| Normalize training days
|--------------------------------------------------------------------------
*/

function normalizeTrainingDays(
  trainingDays: number | null,
): number {

  return Math.min(
    Math.max(
      trainingDays ?? 3,
      1,
    ),
    6,
  );
}


/*
|--------------------------------------------------------------------------
| Workout split
|--------------------------------------------------------------------------
*/

function getWorkoutSplit(
  profile: WorkoutProfile,
): WorkoutDayType[] {

  const trainingDays =
    normalizeTrainingDays(
      profile.training_days,
    );


  if (
    profile.split_preference ===
    "full_body"
  ) {

    return Array.from(
      {
        length: trainingDays,
      },
      () =>
        "Full Body" as WorkoutDayType,
    );
  }


  if (
    profile.split_preference ===
    "upper_lower"
  ) {

    switch(trainingDays) {

      case 2:
        return [
          "Full Body",
          "Full Body",
        ];

      case 3:
        return [
          "Upper Body",
          "Lower Body",
          "Full Body",
        ];

      case 4:
        return [
          "Upper Body",
          "Lower Body",
          "Upper Body",
          "Lower Body",
        ];

      case 5:
        return [
          "Upper Body",
          "Lower Body",
          "Upper Body",
          "Lower Body",
          "Upper Body",
        ];

      case 6:
        return [
          "Upper Body",
          "Lower Body",
          "Upper Body",
          "Lower Body",
          "Upper Body",
          "Lower Body",
        ];

      default:
        return [
          "Full Body",
          "Full Body",
        ];
    }
  }


  if (
    profile.split_preference ===
    "push_pull_legs"
  ) {

    switch(trainingDays) {

      case 3:
        return [
          "Push",
          "Pull",
          "Legs",
        ];

      case 4:
        return [
          "Push",
          "Pull",
          "Legs",
          "Full Body",
        ];

      case 5:
        return [
          "Push",
          "Pull",
          "Legs",
          "Upper Body",
          "Lower Body",
        ];

      case 6:
        return [
          "Push",
          "Pull",
          "Legs",
          "Push",
          "Pull",
          "Legs",
        ];

      default:
        return [
          "Full Body",
          "Full Body",
        ];
    }
  }


  return Array.from(
    {
      length: trainingDays,
    },
    () =>
      "Full Body" as WorkoutDayType,
  );
}


/*
|--------------------------------------------------------------------------
| Active workout days
|--------------------------------------------------------------------------
*/

function getActiveDays(
  trainingDays: number,
): number[] {

  const schedule: Record<
    number,
    number[]
  > = {

    1: [
      2,
    ],

    2: [
      0,
      3,
    ],

    3: [
      0,
      2,
      4,
    ],

    4: [
      0,
      1,
      3,
      5,
    ],

    5: [
      0,
      1,
      2,
      4,
      5,
    ],

    6: [
      0,
      1,
      2,
      3,
      4,
      5,
    ],
  };


  return (
    schedule[trainingDays]
    ??
    schedule[3]
  );
}


/*
|--------------------------------------------------------------------------
| Generate workout plan
|--------------------------------------------------------------------------
*/

export function generateWorkoutPlan(
  profile: WorkoutProfile,
): WeeklyWorkoutPlan {


  const trainingDays =
    normalizeTrainingDays(
      profile.training_days,
    );


  const normalizedProfile: WorkoutProfile = {

    ...profile,

    training_days:
      trainingDays,

  };


  const split =
    getWorkoutSplit(
      normalizedProfile,
    );


  const activeDays =
    getActiveDays(
      trainingDays,
    );


  const weeklyVolume =
    calculateWeeklyVolume({

      goal:
        normalizedProfile.fitness_goal ??
        "Build Muscle",

      experienceLevel:
        normalizedProfile.experience_level ??
        "Intermediate",

      trainingDays,

    });


  const days: WorkoutDay[] = [];

  let splitIndex = 0;


  for(
    let dayIndex = 0;
    dayIndex < 7;
    dayIndex++
  ){


    if(
      !activeDays.includes(
        dayIndex,
      )
    ){

      days.push({

        dayIndex,

        dayName:
          dayNames[dayIndex],

        type:
          "Rest",

        durationMinutes:
          0,

        exercises: [],

      });

      continue;

    }


    const type =
      split[splitIndex]
      ??
      "Full Body";


    const workout =
      buildWorkoutDay({

        goal:
          normalizedProfile.fitness_goal ??
          "Build Muscle",

        experienceLevel:
          normalizedProfile.experience_level ??
          "Intermediate",

        trainingDays,

        split:
          type,

        injuryNotes:
          normalizedProfile.injury_notes ??
          null,

        weeklyVolume,

        sessionDuration:
          normalizedProfile.session_duration ??
          60,

      });


    if(
      !workout ||
      !Array.isArray(
        workout.exercises,
      )
    ){

      throw new Error(
        "Unable to build workout day.",
      );

    }


    if(
      workout.exercises.length === 0
    ){

      throw new Error(
        `No exercises for ${type}`,
      );

    }


    const exercises =
      workout.exercises.map(
        (exercise)=>({

          id:
            exercise.id,

          name:
            exercise.name,

          muscleGroup:
            exercise.muscleGroup,

          equipment:
            exercise.equipment,

          sets:
            exercise.defaultSets,

          reps:
            `${exercise.repRange.min}-${exercise.repRange.max}`,

          restSeconds:
            exercise.restSeconds,

        }),
      );


    days.push({

      dayIndex,

      dayName:
        dayNames[dayIndex],

      type,

      durationMinutes:
        normalizedProfile.session_duration ??
        60,

      exercises,

    });


    splitIndex++;

  }


  return {

    goal:
      normalizedProfile.fitness_goal ??
      "Build Muscle",

    trainingDays,

    experienceLevel:
      normalizedProfile.experience_level ??
      "Intermediate",

    trainingLocation:
      normalizedProfile.training_location ??
      "Gym",

    days,

  };

}