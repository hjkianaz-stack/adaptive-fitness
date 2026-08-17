export type WorkoutSet = {
  id: number;
  targetReps: number;
  targetWeight: number;
  completed: boolean;
  actualReps?: number;
  actualWeight?: number;
};

export type WorkoutExercise = {
  id: number;
  name: string;
  muscle: string;
  equipment: string;
  sets: WorkoutSet[];
  restSeconds: number;
};

export const workoutData = {
  title: "Upper Body",
  subtitle: "Chest, Back & Shoulders",
  duration: 45,
  exercises: [
    {
      id: 1,
      name: "Bench Press",
      muscle: "Chest",
      equipment: "Barbell",
      restSeconds: 120,
      sets: [
        {
          id: 1,
          targetReps: 10,
          targetWeight: 40,
          completed: false,
        },
        {
          id: 2,
          targetReps: 10,
          targetWeight: 40,
          completed: false,
        },
        {
          id: 3,
          targetReps: 8,
          targetWeight: 42.5,
          completed: false,
        },
      ],
    },
    {
      id: 2,
      name: "Lat Pulldown",
      muscle: "Back",
      equipment: "Cable",
      restSeconds: 90,
      sets: [
        {
          id: 1,
          targetReps: 10,
          targetWeight: 45,
          completed: false,
        },
        {
          id: 2,
          targetReps: 10,
          targetWeight: 45,
          completed: false,
        },
        {
          id: 3,
          targetReps: 10,
          targetWeight: 45,
          completed: false,
        },
      ],
    },
    {
      id: 3,
      name: "Shoulder Press",
      muscle: "Shoulders",
      equipment: "Dumbbell",
      restSeconds: 90,
      sets: [
        {
          id: 1,
          targetReps: 10,
          targetWeight: 12.5,
          completed: false,
        },
        {
          id: 2,
          targetReps: 10,
          targetWeight: 12.5,
          completed: false,
        },
        {
          id: 3,
          targetReps: 8,
          targetWeight: 15,
          completed: false,
        },
      ],
    },
  ],
};