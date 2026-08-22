import type { Exercise } from "./types";

export const shouldersExercises: Exercise[] = [
  {
    id: "shoulder-press-machine",

    name: "Machine Shoulder Press",

    muscleGroup: "Shoulders",

    secondaryMuscles: [
      "Triceps",
    ],

    equipment: "Machine",

    difficulty: "Beginner",

    movementPattern: "Push",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 12,
    },

    restSeconds: 90,

    fatigueLevel: "Medium",

    substitutions: [
      "Dumbbell Shoulder Press",
    ],

    image:
      "/exercises/shoulder-press-machine.webp",

    instructions: [
      "ارتفاع صندلی دستگاه را طوری تنظیم کنید که دسته‌ها تقریباً هم‌سطح شانه باشند.",
      "روی صندلی بنشینید و پشت خود را به پشتی تکیه دهید.",
      "دسته‌ها را محکم بگیرید.",
      "دسته‌ها را به سمت بالا فشار دهید.",
      "در بالاترین نقطه آرنج‌ها را کاملاً قفل نکنید.",
      "دسته‌ها را با کنترل به سمت پایین برگردانید.",
      "در تمام حرکت شانه‌ها را از سمت گوش‌ها دور نگه دارید.",
    ],
  },

  {
    id: "lateral-raise-dumbbell",

    name: "Dumbbell Lateral Raise",

    muscleGroup: "Shoulders",

    secondaryMuscles: [],

    equipment: "Dumbbell",

    difficulty: "Beginner",

    movementPattern: "Push",

    defaultSets: 3,

    repRange: {
      min: 12,
      max: 15,
    },

    restSeconds: 60,

    fatigueLevel: "Low",

    substitutions: [
      "Cable Lateral Raise",
    ],

    image:
      "/exercises/lateral-raise-dumbbell.webp",

    instructions: [
      "در حالت ایستاده یک دمبل در هر دست بگیرید.",
      "دست‌ها را در کنار بدن قرار دهید و آرنج‌ها را کمی خم نگه دارید.",
      "دمبل‌ها را به‌آرامی از طرفین بالا ببرید.",
      "تا حدود ارتفاع شانه‌ها بالا بیاورید.",
      "در بالاترین نقطه مکث کوتاهی داشته باشید.",
      "دمبل‌ها را با کنترل پایین بیاورید.",
      "از تاب دادن بدن و استفاده از حرکت ناگهانی خودداری کنید.",
    ],
  },
];