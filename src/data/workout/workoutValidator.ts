import type { WorkoutDay } from "./types";


export type WorkoutValidationResult = {
  valid: boolean;

  warnings: string[];
};



export function validateWorkoutPlan(
  days: WorkoutDay[],
): WorkoutValidationResult {


  const warnings:string[] = [];


  /*
   * بررسی تعداد تمرینات هر جلسه
   */
  days.forEach((day)=>{


    if(day.type === "Rest"){
      return;
    }


    if(day.exercises.length === 0){

      warnings.push(
        `${day.dayName} has no exercises.`,
      );

    }



    if(day.exercises.length > 8){

      warnings.push(
        `${day.dayName} contains too many exercises.`,
      );

    }

  });



  /*
   * بررسی حجم ست‌ها
   */
  days.forEach((day)=>{


    const totalSets =
      day.exercises.reduce(
        (sum,exercise)=>
          sum + exercise.sets,
        0,
      );


    if(
      totalSets > 30
    ){

      warnings.push(
        `${day.dayName} has excessive training volume.`,
      );

    }


  });



  /*
   * بررسی روزهای استراحت
   */
  const restDays =
    days.filter(
      day =>
        day.type === "Rest",
    ).length;



  if(restDays < 1){

    warnings.push(
      "User should have at least one rest day.",
    );

  }



  return {

    valid:
      warnings.length === 0,

    warnings,

  };
}