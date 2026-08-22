export type UserProfile = {
  personal: {
    fullName: string;
    email: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
  };

  fitnessGoal: string;

  training: {
    trainingDays: string;
    sessionDuration: string;
    trainingLocation: string;
    experienceLevel: string;
  };

  nutrition: {
    dietPreference: string;
    dailyMeals: string;
    waterGoal: string;
  };
};

export const profileData: UserProfile = {
  personal: {
    fullName: "Alex Johnson",
    email: "alex@example.com",
    age: "30",
    height: "161",
    weight: "54",
    gender: "Female",
  },

  fitnessGoal: "Build Muscle",

  training: {
    trainingDays: "4 days/week",
    sessionDuration: "60 min",
    trainingLocation: "Gym",
    experienceLevel: "Intermediate",
  },

  nutrition: {
    dietPreference: "Balanced",
    dailyMeals: "4",
    waterGoal: "2.5 L",
  },
};