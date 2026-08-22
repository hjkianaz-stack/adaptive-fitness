import { supabase } from "@/lib/supabase";

import {
  getCoachAnalysis,
} from "@/lib/coach/getCoachAnalysis";

import {
  generateMonthlyWorkoutPlan,
} from "@/data/progression/monthlyWorkoutGenerator";

import {
  saveWorkoutPlan,
} from "@/lib/plans/saveWorkoutPlan";



export async function generateMonthlyPlan() {


  const {
    data: { user },
  } =
    await supabase.auth.getUser();



  if (!user) {

    throw new Error(
      "User is not authenticated.",
    );

  }



  const month =
    new Date().getMonth() + 1;



  const {
    data: existingPlans,
    error: existingError,
  } =
    await supabase
      .from("workout_plans")
      .select("*")
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "month",
        month,
      )
      .order(
        "created_at",
        {
          ascending: false,
        },
      )
      .limit(1);



  if (existingError) {

    throw existingError;

  }



  const existingPlan =
    existingPlans?.[0];



  if (existingPlan) {

    return existingPlan;

  }



  const {
    data: profile,
    error,
  } =
    await supabase
      .from("profiles")
      .select(
        `
        fitness_goal,
        training_days,
        session_duration,
        experience_level,
        training_location,

        age,
        height_cm,
        weight_kg,
        body_fat,

        training_experience_months,
        injury_notes,

        split_preference,
        upper_body_days,
        lower_body_days
        `,
      )
      .eq(
        "id",
        user.id,
      )
      .single();



  if (error) {

    throw error;

  }



  const workoutProfile = {

    ...profile,


    training_experience_months:
      profile.training_experience_months ?? null,


    upper_body_days:
      profile.upper_body_days ?? 2,


    lower_body_days:
      profile.lower_body_days ?? 2,

  };



  const analysis =
    await getCoachAnalysis();



  const monthlyPlan =
    generateMonthlyWorkoutPlan(
      workoutProfile,
      analysis,
    );



  const savedPlan =
    await saveWorkoutPlan({

      month,


      goal:
        workoutProfile.fitness_goal ??
        "Build Muscle",


      planData:
        monthlyPlan,

    });



  return savedPlan;

}