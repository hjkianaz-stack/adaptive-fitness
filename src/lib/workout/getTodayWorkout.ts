import {
  generateWorkoutPlan,
  type WorkoutProfile,
} from "@/data/workout/workoutGenerator";


export function getTodayWorkout(
  profile: Partial<WorkoutProfile>,
) {

  const workoutProfile: WorkoutProfile = {

    fitness_goal:
      profile.fitness_goal ??
      "Build Muscle",


    training_days:
      profile.training_days ??
      3,


    session_duration:
      profile.session_duration ??
      60,


    experience_level:
      profile.experience_level ??
      "Intermediate",


    training_location:
      profile.training_location ??
      "Gym",



    // Body information

    age:
      profile.age ??
      null,


    height_cm:
      profile.height_cm ??
      null,


    weight_kg:
      profile.weight_kg ??
      null,


    body_fat:
      profile.body_fat ??
      null,



    // Experience

    training_experience_months:
      profile.training_experience_months ??
      null,



    // Injury

    injury_notes:
      profile.injury_notes ??
      null,



    // Split

    split_preference:
      profile.split_preference ??
      "upper_lower",


    upper_body_days:
      profile.upper_body_days ??
      2,


    lower_body_days:
      profile.lower_body_days ??
      2,
  };



  const plan =
    generateWorkoutPlan(
      workoutProfile,
    );



  const currentDay =
    new Date().getDay();



  const todayIndex =
    currentDay === 0
      ? 6
      : currentDay - 1;



  return plan.days[todayIndex];
}