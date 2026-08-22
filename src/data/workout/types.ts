export type WorkoutDayType =
  | "Upper Body"
  | "Lower Body"
  | "Full Body"
  | "Push"
  | "Pull"
  | "Legs"
  | "Rest";



export type WorkoutExercise = {

  id: string;

  name: string;

  muscleGroup: string;

  equipment: string;

  sets: number;

  reps: string;

  restSeconds: number;

};



export type WorkoutDay = {

  dayIndex: number;

  dayName: string;

  type: WorkoutDayType;

  durationMinutes: number;

  exercises: WorkoutExercise[];

};



export type WeeklyWorkoutPlan = {

  goal: string;

  trainingDays: number;

  experienceLevel: string;

  trainingLocation: string;

  days: WorkoutDay[];

};