import type { Exercise } from "./types";

export const armsExercises: Exercise[] = [
  {
    id: "barbell-biceps-curl",

    name: "Barbell Biceps Curl",

    muscleGroup: "Biceps",

    secondaryMuscles: [
      "Forearms",
    ],

    equipment: "Barbell",

    difficulty: "Beginner",

    movementPattern: "Pull",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 12,
    },

    restSeconds: 60,

    fatigueLevel: "Medium",

    substitutions: [
      "Dumbbell Curl",
    ],

    image:
      "/exercises/barbell-biceps-curl.webp",

    instructions: [
      "ایستاده و صاف بایستید و هالتر را با کف دست رو به جلو بگیرید.",
      "آرنج‌ها را نزدیک بدن و ثابت نگه دارید.",
      "هالتر را با خم کردن آرنج‌ها به سمت شانه‌ها بالا بیاورید.",
      "در بالاترین نقطه عضلات دوسر بازو را منقبض کنید.",
      "هالتر را به‌آرامی و با کنترل به نقطه شروع برگردانید.",
      "در تمام حرکت از تاب دادن بدن و حرکت دادن شانه‌ها خودداری کنید.",
    ],
  },

  {
    id: "cable-triceps-pushdown",

    name: "Cable Triceps Pushdown",

    muscleGroup: "Triceps",

    secondaryMuscles: [],

    equipment: "Cable",

    difficulty: "Beginner",

    movementPattern: "Push",

    defaultSets: 3,

    repRange: {
      min: 10,
      max: 15,
    },

    restSeconds: 60,

    fatigueLevel: "Low",

    substitutions: [
      "Dumbbell Triceps Extension",
    ],

    image:
      "/exercises/cable-triceps-pushdown.webp",

    instructions: [
      "روبروی دستگاه سیم‌کش بایستید و دسته را با هر دو دست بگیرید.",
      "آرنج‌ها را نزدیک بدن و ثابت نگه دارید.",
      "دسته را با باز کردن آرنج‌ها به سمت پایین فشار دهید.",
      "در انتهای حرکت عضلات پشت بازو را منقبض کنید.",
      "دسته را به‌آرامی و با کنترل به نقطه شروع برگردانید.",
      "در طول حرکت شانه‌ها را ثابت نگه دارید.",
    ],
  },
];