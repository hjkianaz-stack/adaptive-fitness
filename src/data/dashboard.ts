export const dashboardData = {
  userName: "Kiana",

  todayWorkout: {
    title: "Upper Body",
    subtitle: "Chest, Back & Shoulders",
    exercises: 6,
    duration: 45,
    difficulty: "Moderate",
  },

  progress: {
    workouts: 3,
    streak: 12,
    weeklyVolume: 4280,
  },

  weeklyActivity: [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ],

  recentActivity: [
    {
      exercise: "Bench Press",
      sets: 3,
      reps: 10,
      change: "+2.5 kg",
    },
    {
      exercise: "Lat Pulldown",
      sets: 3,
      reps: 10,
      change: "+5 kg",
    },
    {
      exercise: "Shoulder Press",
      sets: 3,
      reps: 8,
      change: "+2.5 kg",
    },
  ],
};