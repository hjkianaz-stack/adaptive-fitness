import type { Exercise } from "./types";

export const legsExercises: Exercise[] = [
  {
    id: "barbell-squat",

    name: "Barbell Squat",

    muscleGroup: "Quadriceps",

    secondaryMuscles: [
      "Glutes",
      "Hamstrings",
    ],

    equipment: "Barbell",

    difficulty: "Intermediate",

    movementPattern: "Squat",

    defaultSets: 3,

    repRange: {
      min: 6,
      max: 10,
    },

    restSeconds: 120,

    fatigueLevel: "High",

    substitutions: [
      "Leg Press",
    ],

    image:
      "/exercises/barbell-squat.webp",

    instructions: [
      "هالتر را روی قسمت بالایی پشت قرار دهید.",
      "پاها را تقریباً به عرض شانه باز کنید.",
      "سینه را بالا و ستون فقرات را در وضعیت خنثی نگه دارید.",
      "با خم کردن همزمان زانو و لگن به سمت پایین حرکت کنید.",
      "تا عمقی که بتوانید فرم صحیح را حفظ کنید پایین بروید.",
      "با فشار دادن کف پا به زمین به نقطه شروع برگردید.",
      "زانوها باید در راستای جهت پنجه پا حرکت کنند.",
    ],
  },

  {
    id: "romanian-deadlift",

    name: "Romanian Deadlift",

    muscleGroup: "Hamstrings",

    secondaryMuscles: [
      "Glutes",
    ],

    equipment: "Barbell",

    difficulty: "Intermediate",

    movementPattern: "Hinge",

    defaultSets: 3,

    repRange: {
      min: 8,
      max: 10,
    },

    restSeconds: 120,

    fatigueLevel: "High",

    substitutions: [
      "Dumbbell Romanian Deadlift",
    ],

    image:
      "/exercises/romanian-deadlift.webp",

    instructions: [
      "هالتر را با دست‌ها کمی بیشتر از عرض شانه بگیرید.",
      "پاها را تقریباً به عرض لگن قرار دهید.",
      "زانوها را کمی خم نگه دارید.",
      "لگن را به سمت عقب حرکت دهید و هالتر را نزدیک پاها پایین بیاورید.",
      "کمر را در وضعیت خنثی نگه دارید.",
      "تا جایی پایین بروید که کشش مناسبی در همسترینگ احساس کنید.",
      "با فشار دادن لگن به سمت جلو به وضعیت ایستاده برگردید.",
      "از گرد کردن کمر در طول حرکت خودداری کنید.",
    ],
  },

  {
    id: "leg-press",

    name: "Leg Press",

    muscleGroup: "Quadriceps",

    secondaryMuscles: [
      "Glutes",
      "Hamstrings",
    ],

    equipment: "Machine",

    difficulty: "Beginner",

    movementPattern: "Squat",

    defaultSets: 3,

    repRange: {
      min: 10,
      max: 12,
    },

    restSeconds: 90,

    fatigueLevel: "Medium",

    substitutions: [
      "Hack Squat",
    ],

    image:
      "/exercises/leg-press.webp",

    instructions: [
      "روی دستگاه پرس پا بنشینید و پشت خود را کاملاً به پشتی تکیه دهید.",
      "پاها را روی صفحه دستگاه تقریباً به عرض شانه قرار دهید.",
      "وزنه را از حالت قفل خارج کنید.",
      "زانوها را با کنترل خم کنید و صفحه را به سمت خود پایین بیاورید.",
      "تا عمقی که بتوانید لگن و کمر را در وضعیت مناسب نگه دارید پایین بروید.",
      "صفحه را با فشار کف پا به سمت بالا برگردانید.",
      "در بالاترین نقطه زانوها را به‌شدت قفل نکنید.",
    ],
  },
];