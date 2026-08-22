import {
  generateWorkoutPlan,
  type WorkoutProfile,
} from "@/data/workout/workoutGenerator";

import {
  createMonthlyPlan,
  type ProgressAnalysis,
} from "./monthlyPlanner";


export type MonthlyWorkoutPlan = {
  month: number;

  adjustment: {
    action:
      | "increase"
      | "maintain"
      | "deload";

    volumeAdjustment: number;

    intensityAdjustment: number;

    reason: string;
  };

  workoutPlan: ReturnType<
    typeof generateWorkoutPlan
  >;
};



export function generateMonthlyWorkoutPlan(
  profile: WorkoutProfile,

  analysis: ProgressAnalysis,

  month: number = 1,
): MonthlyWorkoutPlan {


  const adjustment =
    createMonthlyPlan(
      analysis,
    );



  /*
   * اعمال تغییرات ماهانه
   */
  const adjustedProfile: WorkoutProfile = {

    ...profile,

    /*
     * فعلاً تغییرات حجم و شدت
     * داخل Engine اعمال می‌شود.
     * اینجا فقط Pipeline را آماده می‌کنیم.
     */
  };



  const workoutPlan =
    generateWorkoutPlan(
      adjustedProfile,
    );



  return {

    month,

    adjustment,

    workoutPlan,

  };
}