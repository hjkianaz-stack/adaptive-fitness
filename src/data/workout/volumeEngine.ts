export type TrainingGoal =
  | "Build Muscle"
  | "Fat Loss"
  | "Strength"
  | "General Fitness";

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Quadriceps"
  | "Hamstrings"
  | "Glutes"
  | "Calves"
  | "Core";

export type MuscleVolume = {
  muscleGroup: MuscleGroup;
  weeklySets: number;
};

type VolumeInput = {
  goal: string;
  experienceLevel: string;
  trainingDays: number;
};

function normalizeGoal(goal: string): TrainingGoal {
  if (goal === "Strength") {
    return "Strength";
  }

  if (goal === "Fat Loss") {
    return "Fat Loss";
  }

  if (goal === "General Fitness") {
    return "General Fitness";
  }

  return "Build Muscle";
}

function getExperienceMultiplier(
  experienceLevel: string,
): number {
  switch (experienceLevel) {
    case "Beginner":
      return 0.75;

    case "Advanced":
      return 1.15;

    case "Intermediate":
    default:
      return 1;
  }
}

function getBaseVolume(
  goal: TrainingGoal,
): number {
  switch (goal) {
    case "Strength":
      return 8;

    case "Fat Loss":
      return 10;

    case "General Fitness":
      return 10;

    case "Build Muscle":
    default:
      return 12;
  }
}

export function calculateWeeklyVolume(
  input: VolumeInput,
): MuscleVolume[] {
  const goal = normalizeGoal(input.goal);

  const experienceMultiplier =
    getExperienceMultiplier(
      input.experienceLevel,
    );

  const baseVolume =
    getBaseVolume(goal);

  /*
   * Training frequency affects how much
   * weekly volume can reasonably be distributed.
   *
   * We don't simply multiply volume by
   * training days because frequency is
   * already reflected in the distribution
   * across workout sessions.
   */

  const volume = Math.round(
    baseVolume * experienceMultiplier,
  );

  const volumes: Record<
    MuscleGroup,
    number
  > = {
    Chest: volume,

    Back:
      Math.round(
        volume * 1.1,
      ),

    Shoulders:
      Math.round(
        volume * 0.75,
      ),

    Biceps:
      Math.round(
        volume * 0.65,
      ),

    Triceps:
      Math.round(
        volume * 0.65,
      ),

    Quadriceps:
      volume,

    Hamstrings:
      Math.round(
        volume * 0.8,
      ),

    Glutes:
      Math.round(
        volume * 0.7,
      ),

    Calves:
      Math.round(
        volume * 0.6,
      ),

    Core:
      6,
  };

  /*
   * Minimum and maximum safeguards.
   *
   * This prevents very low or excessive
   * weekly volume from being generated.
   */

  return (
    Object.entries(volumes) as [
      MuscleGroup,
      number,
    ][]
  ).map(
    ([muscleGroup, weeklySets]) => ({
      muscleGroup,

      weeklySets: Math.min(
        Math.max(
          weeklySets,
          4,
        ),
        20,
      ),
    }),
  );
}