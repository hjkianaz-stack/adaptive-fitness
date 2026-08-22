export type ProgressStat = {
  label: string;
  value: string;
  description: string;
};

export type StrengthProgressItem = {
  exercise: string;
  muscle: string;
  startWeight: number;
  currentWeight: number;
  unit: string;
};

export type TrainingActivityItem = {
  day: string;
  date: string;
  completed: boolean;
};

export type PersonalRecord = {
  exercise: string;
  value: number;
  unit: string;
  date: string;
};

export const progressData = {
  stats: [
    {
      label: "Current weight",
      value: "54.0 kg",
      description: "Latest measurement",
    },
    {
      label: "Workouts",
      value: "12",
      description: "This month",
    },
    {
      label: "Weekly volume",
      value: "4,280 kg",
      description: "Current week",
    },
  ] satisfies ProgressStat[],

  strengthProgress: [
    {
      exercise: "Bench Press",
      muscle: "Chest",
      startWeight: 40,
      currentWeight: 45,
      unit: "kg",
    },
    {
      exercise: "Squat",
      muscle: "Legs",
      startWeight: 60,
      currentWeight: 70,
      unit: "kg",
    },
    {
      exercise: "Lat Pulldown",
      muscle: "Back",
      startWeight: 45,
      currentWeight: 55,
      unit: "kg",
    },
    {
      exercise: "Shoulder Press",
      muscle: "Shoulders",
      startWeight: 10,
      currentWeight: 15,
      unit: "kg",
    },
  ] satisfies StrengthProgressItem[],

  trainingActivity: [
    {
      day: "Mon",
      date: "Aug 10",
      completed: true,
    },
    {
      day: "Tue",
      date: "Aug 11",
      completed: true,
    },
    {
      day: "Wed",
      date: "Aug 12",
      completed: false,
    },
    {
      day: "Thu",
      date: "Aug 13",
      completed: true,
    },
    {
      day: "Fri",
      date: "Aug 14",
      completed: false,
    },
    {
      day: "Sat",
      date: "Aug 15",
      completed: true,
    },
    {
      day: "Sun",
      date: "Aug 16",
      completed: false,
    },
  ] satisfies TrainingActivityItem[],

  personalRecords: [
    {
      exercise: "Bench Press",
      value: 45,
      unit: "kg",
      date: "Aug 13",
    },
    {
      exercise: "Squat",
      value: 70,
      unit: "kg",
      date: "Aug 15",
    },
    {
      exercise: "Lat Pulldown",
      value: 55,
      unit: "kg",
      date: "Aug 13",
    },
    {
      exercise: "Shoulder Press",
      value: 15,
      unit: "kg",
      date: "Aug 15",
    },
  ] satisfies PersonalRecord[],
};