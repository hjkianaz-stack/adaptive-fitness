export type Profile = {
  id: string;
  full_name: string;
  email: string;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  gender: string | null;

  fitness_goal: string | null;

  training_days: number | null;
  session_duration: number | null;
  training_location: string | null;
  experience_level: string | null;

  diet_preference: string | null;
  daily_meals: number | null;
  water_goal: number | null;

  created_at: string;
  updated_at: string;
};