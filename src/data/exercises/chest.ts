import type { Exercise } from "./types";

export const chestExercises: Exercise[] = [
  {
    id: "bench-press",

    name: "Bench Press",

    muscleGroup: "Chest",

    secondaryMuscles: [
      "Triceps",
      "Shoulders",
    ],

    equipment: "Barbell",

    difficulty: "Intermediate",

    movementPattern: "Push",

    defaultSets: 3,

    repRange: {
      min: 6,
      max: 10,
    },

    restSeconds: 120,

    fatigueLevel: "High",

    substitutions: [
      "Dumbbell Bench Press",
      "Machine Chest Press",
    ],

    image:
      "/exercises/bench-press.webp",

    instructions: [
      "روی نیمکت دراز بکشید و پاها را محکم روی زمین قرار دهید.",
      "هالتر را کمی بیشتر از عرض شانه بگیرید.",
      "هالتر را از پایه خارج کنید و بالای سینه قرار دهید.",
      "هالتر را با کنترل به سمت قسمت میانی سینه پایین بیاورید.",
      "پس از تماس کنترل‌شده با سینه، هالتر را به سمت بالا فشار دهید.",
      "در طول حرکت مچ دست و ساعد را در راستای مناسب نگه دارید.",
      "از بلند کردن باسن از روی نیمکت خودداری کنید.",
    ],
  },

  {
    id: "incline-dumbbell-press",

    name: "Incline Dumbbell Press",

    muscleGroup: "Chest",

    secondaryMuscles: [
      "Shoulders",
      "Triceps",
    ],

    equipment: "Dumbbell",

    difficulty: "Intermediate",

    movementPattern: "Push",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 12,
    },

    restSeconds: 90,

    fatigueLevel: "Medium",

    substitutions: [
      "Incline Barbell Press",
    ],

    image:
      "/exercises/incline-dumbbell-press.webp",

    instructions: [
      "نیمکت را در شیب مناسب تنظیم کنید.",
      "دمبل‌ها را در کنار سینه قرار دهید.",
      "شانه‌ها را عقب و پایین نگه دارید.",
      "دمبل‌ها را به سمت بالا و کمی به سمت داخل فشار دهید.",
      "در بالاترین نقطه آرنج‌ها را کاملاً قفل نکنید.",
      "دمبل‌ها را با کنترل به سمت پایین برگردانید.",
      "در تمام حرکت کنترل کامل روی دمبل‌ها داشته باشید.",
    ],
  },

  {
    id: "cable-fly",

    name: "Cable Fly",

    muscleGroup: "Chest",

    secondaryMuscles: [],

    equipment: "Cable",

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
      "Dumbbell Fly",
    ],

    image:
      "/exercises/cable-fly.webp",

    instructions: [
      "دسته‌های سیم‌کش را در ارتفاع مناسب قرار دهید.",
      "در مرکز دستگاه بایستید و هر دو دسته را بگیرید.",
      "یک قدم جلو بروید و بدن را در وضعیت پایدار قرار دهید.",
      "آرنج‌ها را کمی خم نگه دارید.",
      "دست‌ها را به سمت یکدیگر و جلوی بدن حرکت دهید.",
      "در نقطه جمع شدن دست‌ها عضلات سینه را منقبض کنید.",
      "دست‌ها را با کنترل به نقطه شروع برگردانید.",
    ],
  },
];