import { supabase } from "@/lib/supabase";


export async function getCurrentWorkoutPlan() {

  const {
    data: { user },
  } =
    await supabase.auth.getUser();


  if (!user) {

    throw new Error(
      "User is not authenticated.",
    );

  }



  const currentMonth =
    new Date().getMonth() + 1;



  const {
    data,
    error,
  } =
    await supabase
      .from("workout_plans")
      .select(
        `
        id,
        month,
        goal,
        plan_data
        `,
      )
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "month",
        currentMonth,
      )
      .order(
        "created_at",
        {
          ascending: false,
        },
      )
      .limit(1)
      .maybeSingle();



  if (error) {

    throw error;

  }



  return data;

}