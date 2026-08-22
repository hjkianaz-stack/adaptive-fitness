export type ProgressAnalysis = {
  status:
    | "increase"
    | "maintain"
    | "decrease";

  volumeAdjustment: number;

  intensityAdjustment: number;

  recommendation: string;
};


export type MonthlyPlanAdjustment = {
  action:
    | "increase"
    | "maintain"
    | "deload";

  volumeAdjustment: number;

  intensityAdjustment: number;

  reason: string;
};


/**
 * تصمیم‌گیری برای تغییر برنامه ماه بعد
 */
export function createMonthlyPlan(
  analysis: ProgressAnalysis,
): MonthlyPlanAdjustment {


  /*
   * خستگی یا افت عملکرد
   */
  if (
    analysis.status === "decrease"
  ) {

    return {

      action: "deload",

      volumeAdjustment: -40,

      intensityAdjustment: -20,

      reason:
        "Performance dropped. Recovery phase recommended.",
    };
  }



  /*
   * پیشرفت مثبت
   */
  if (
    analysis.status === "increase"
  ) {

    return {

      action: "increase",

      volumeAdjustment:
        analysis.volumeAdjustment,

      intensityAdjustment:
        analysis.intensityAdjustment,

      reason:
        analysis.recommendation,
    };
  }



  /*
   * حفظ برنامه
   */
  return {

    action: "maintain",

    volumeAdjustment: 0,

    intensityAdjustment: 0,

    reason:
      "Current training plan remains effective.",
  };
}