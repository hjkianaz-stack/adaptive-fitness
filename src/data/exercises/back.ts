import type { Exercise } from "./types";

export const backExercises: Exercise[] = [
  {
    id: "lat-pulldown",

    name: "Lat Pulldown",

    muscleGroup: "Back",

    secondaryMuscles: [
      "Biceps",
    ],

    equipment: "Machine",

    difficulty: "Beginner",

    movementPattern: "Pull",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 12,
    },

    restSeconds: 90,

    fatigueLevel: "Medium",

    substitutions: [
      "Pull Up",
    ],

    image:
      "/exercises/lat-pulldown.webp",

    instructions: [
      "روی دستگاه بنشینید و زانوها را زیر پد دستگاه قرار دهید.",
      "میله را کمی بیشتر از عرض شانه بگیرید.",
      "سینه را بالا نگه دارید و شانه‌ها را به سمت پایین بکشید.",
      "میله را به سمت بالای سینه پایین بیاورید.",
      "در پایین حرکت عضلات پشت را منقبض کنید.",
      "میله را با کنترل به سمت بالا برگردانید.",
      "از کشیدن میله پشت گردن و تاب دادن بدن خودداری کنید.",
    ],
  },

  {
    id: "barbell-row",

    name: "Barbell Row",

    muscleGroup: "Back",

    secondaryMuscles: [
      "Biceps",
    ],

    equipment: "Barbell",

    difficulty: "Intermediate",

    movementPattern: "Pull",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 10,
    },

    restSeconds: 120,

    fatigueLevel: "High",

    substitutions: [
      "Cable Row",
    ],

    image:
      "/exercises/barbell-row.webp",

    instructions: [
      "هالتر را با دست‌ها کمی بیشتر از عرض شانه بگیرید.",
      "زانوها را کمی خم کنید و لگن را به سمت عقب ببرید.",
      "کمر را در وضعیت خنثی و سینه را باز نگه دارید.",
      "هالتر را به سمت قسمت پایین شکم بکشید.",
      "در بالاترین نقطه کتف‌ها را به سمت یکدیگر نزدیک کنید.",
      "هالتر را با کنترل پایین بیاورید.",
      "از گرد کردن کمر و استفاده از حرکت ناگهانی بدن خودداری کنید.",
    ],
  },

  {
    id: "seated-cable-row",

    name: "Seated Cable Row",

    muscleGroup: "Back",

    secondaryMuscles: [
      "Biceps",
    ],

    equipment: "Cable",

    difficulty: "Beginner",

    movementPattern: "Pull",

    defaultSets: 3,

    repRange: {
      min: 10,
      max: 12,
    },

    restSeconds: 75,

    fatigueLevel: "Medium",

    substitutions: [
      "Machine Row",
    ],

    image:
      "/exercises/seated-cable-row.webp",

    instructions: [
      "روی دستگاه سیم‌کش بنشینید و پاها را روی تکیه‌گاه قرار دهید.",
      "دسته را با هر دو دست بگیرید.",
      "کمر را صاف و سینه را بالا نگه دارید.",
      "دسته را به سمت شکم بکشید.",
      "در انتهای حرکت کتف‌ها را به سمت عقب و داخل ببرید.",
      "دسته را با کنترل به سمت جلو برگردانید.",
      "از خم و راست کردن بیش از حد کمر خودداری کنید.",
    ],
  },
];