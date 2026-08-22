import type {
  MuscleGroup,
  MuscleVolume,
} from "./volumeEngine";


export type DistributedVolume = {
  muscleGroup: MuscleGroup;

  weeklySets: number;

  sessionsPerWeek: number;

  setsPerSession: number;
};


type DistributorInput = {
  weeklyVolume: MuscleVolume[];

  trainingDays: number;
};



export function distributeWeeklyVolume(
  input: DistributorInput,
): DistributedVolume[] {

  return input.weeklyVolume.map(
    (item) => {

      const sessions =
        getMuscleFrequency(
          item.muscleGroup,
          input.trainingDays,
        );


      return {

        muscleGroup:
          item.muscleGroup,

        weeklySets:
          item.weeklySets,

        sessionsPerWeek:
          sessions,

        setsPerSession:
          Math.max(
            1,
            Math.round(
              item.weeklySets /
              sessions,
            ),
          ),
      };
    },
  );
}



/**
 * تعیین تعداد جلسات تحریک عضله
 */
function getMuscleFrequency(
  muscleGroup: MuscleGroup,
  trainingDays: number,
): number {


  if (trainingDays <= 2) {
    return 1;
  }


  if (trainingDays === 3) {
    return 1;
  }


  /*
   * در برنامه‌های ۴ تا ۶ روزه
   * عضلات اصلی معمولاً دو بار
   * در هفته تحریک می‌شوند.
   */
  if (
    [
      "Chest",
      "Back",
      "Shoulders",
      "Quadriceps",
      "Hamstrings",
      "Glutes",
      "Biceps",
      "Triceps",
    ].includes(muscleGroup)
  ) {
    return 2;
  }


  return 1;
}



/**
 * گرفتن حجم توزیع شده یک عضله
 */
export function getDistributedMuscleVolume(
  volume: DistributedVolume[],
  muscleGroup: MuscleGroup,
): DistributedVolume | undefined {

  return volume.find(
    (item) =>
      item.muscleGroup === muscleGroup,
  );
}