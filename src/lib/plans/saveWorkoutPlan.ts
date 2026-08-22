import { supabase } from "@/lib/supabase";


type SaveWorkoutPlanInput = {

  month: number;

  goal: string;

  planData: unknown;

};



export async function saveWorkoutPlan(
  input: SaveWorkoutPlanInput,
) {


  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();



  if (userError) {

    throw userError;

  }



  if (!user) {

    throw new Error(
      "User is not authenticated.",
    );

  }



  const {
    data: profile,
    error: profileError,
  } =
    await supabase
      .from("profiles")
      .select(
        `
        experience_level,
        training_days,
        session_duration,
        training_location,
        split_preference
        `,
      )
      .eq(
        "id",
        user.id,
      )
      .single();



  if (profileError) {

    throw profileError;

  }



  const today = new Date();



  const weekStartDate =
    new Date(today);



  const day =
    weekStartDate.getDay();



  const diff =
    weekStartDate.getDate() -
    day +
    (day === 0 ? -6 : 1);



  weekStartDate.setDate(diff);



  const {
    data,
    error,
  } =
    await supabase
      .from("workout_plans")
      .insert({

        user_id:
          user.id,


        month:
          input.month,


        goal:
          input.goal,


        plan_data:
          input.planData,


        active:
          true,


        week_start_date:
          weekStartDate
            .toISOString()
            .split("T")[0],


        experience_level:
          profile?.experience_level ??
          "Intermediate",


        training_days:
          profile?.training_days ??
          3,


        session_duration:
          profile?.session_duration ??
          60,


        training_location:
          profile?.training_location ??
          "Gym",


        split:
          profile?.split_preference ??
          "upper_lower",

      })
      .select()
      .single();



  if (error) {

    throw error;

  }



  return data;

}