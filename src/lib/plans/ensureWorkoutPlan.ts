import { supabase } from "@/lib/supabase";

import {
  generateWorkoutPlan,
  type WorkoutProfile,
} from "@/data/workout/workoutGenerator";


function getWeekStartDate(): string {

  const date = new Date();

  const day =
    date.getDay() === 0
      ? 7
      : date.getDay();


  date.setDate(
    date.getDate() - day + 1,
  );


  return date
    .toISOString()
    .split("T")[0];

}



export async function ensureWorkoutPlan() {


  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */


  const {
    data:{
      user,
    },
    error:authError,
  } =
    await supabase.auth.getUser();


  if(authError){

    throw authError;

  }


  if(!user){

    throw new Error(
      "User is not authenticated.",
    );

  }



  /*
  |--------------------------------------------------------------------------
  | Load profile first
  |--------------------------------------------------------------------------
  */


  const {
    data:profile,
    error:profileError,
  } =
    await supabase
      .from("profiles")
      .select(`
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
      `)
      .eq(
        "id",
        user.id,
      )
      .single();



  if(profileError){

    throw profileError;

  }



  if(!profile){

    throw new Error(
      "User profile not found.",
    );

  }



  const weekStartDate =
    getWeekStartDate();



  /*
  |--------------------------------------------------------------------------
  | Check existing plan
  |--------------------------------------------------------------------------
  */


  const {
    data:existingPlan,
    error:existingError,
  } =
    await supabase
      .from("workout_plans")
      .select(`
        id,
        month,
        goal,
        fitness_goal,
        experience_level,
        training_days,
        session_duration,
        training_location,
        split,
        plan_data,
        active,
        status,
        week_start_date,
        created_at,
        updated_at
      `)
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "week_start_date",
        weekStartDate,
      )
      .eq(
        "active",
        true,
      )
      .eq(
        "status",
        "active",
      )
      .order(
        "created_at",
        {
          ascending:false,
        },
      )
      .limit(1)
      .maybeSingle();



  if(existingError){

    throw existingError;

  }



  /*
  |--------------------------------------------------------------------------
  | Return existing only if profile matches
  |--------------------------------------------------------------------------
  */


  if(
    existingPlan?.plan_data &&
    existingPlan.training_days ===
    profile.training_days &&
    existingPlan.fitness_goal ===
    profile.fitness_goal &&
    existingPlan.experience_level ===
    profile.experience_level
  ){

    return existingPlan;

  }



  /*
  |--------------------------------------------------------------------------
  | Build workout profile
  |--------------------------------------------------------------------------
  */


  const workoutProfile:WorkoutProfile = {


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


    training_experience_months:
      profile.training_experience_months ??
      null,


    injury_notes:
      profile.injury_notes ??
      null,


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



  if(!plan){

    throw new Error(
      "Failed to generate workout plan.",
    );

  }



  /*
  |--------------------------------------------------------------------------
  | Archive old plan
  |--------------------------------------------------------------------------
  */


  const {
    error:archiveError,
  } =
    await supabase
      .from("workout_plans")
      .update({

        active:false,

        status:"archived",

        updated_at:
          new Date()
            .toISOString(),

      })
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "active",
        true,
      );



  if(archiveError){

    throw archiveError;

  }



  /*
  |--------------------------------------------------------------------------
  | Insert new plan
  |--------------------------------------------------------------------------
  */


  const {
    data:newPlan,
    error:insertError,
  } =
    await supabase
      .from("workout_plans")
      .insert({

        user_id:
          user.id,


        goal:
          workoutProfile.fitness_goal,


        fitness_goal:
          workoutProfile.fitness_goal,


        experience_level:
          workoutProfile.experience_level,


        training_days:
          workoutProfile.training_days,


        session_duration:
          workoutProfile.session_duration,


        training_location:
          workoutProfile.training_location,


        split:
          workoutProfile.split_preference,


        week_start_date:
          weekStartDate,


        plan_data:
          plan,


        active:true,


        status:"active",


        month:
          new Date()
            .getMonth()+1,

      })
      .select()
      .single();



  if(insertError){

    throw insertError;

  }



  return newPlan;

}