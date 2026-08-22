import {
  generateWorkoutPlan,
} from "./workoutGenerator";


const testProfile = {
  fitness_goal: "Build Muscle",

  training_days: 4,

  session_duration: 60,

  experience_level: "Intermediate",

  training_location: "Gym",

  age: 30,

  height_cm: 175,

  weight_kg: 75,

  body_fat: 15,

  training_experience_months: 24,

  injury_notes: null,

  split_preference:
    "upper_lower" as const,

  upper_body_days: 2,

  lower_body_days: 2,
};


const plan =
  generateWorkoutPlan(
    testProfile,
  );


console.log(
  JSON.stringify(
    plan,
    null,
    2,
  ),
);