"use client";

import { useEffect, useState } from "react";

import PersonalRecords from "@/components/progress/PersonalRecords";
import ProgressHeader from "@/components/progress/ProgressHeader";
import ProgressStats from "@/components/progress/ProgressStats";
import StrengthProgress from "@/components/progress/StrengthProgress";
import TrainingActivity from "@/components/progress/TrainingActivity";

import {
  getWorkoutLogs,
  type WorkoutLog,
} from "@/lib/progress";

import { progressData } from "@/data/progress";


export default function ProgressPage() {

  const [logs, setLogs] =
    useState<WorkoutLog[]>([]);



  useEffect(() => {

    async function loadProgress() {

      const {
        data,
        error,
      } = await getWorkoutLogs();



      if (error) {

        console.error(
          "Progress error:",
          error,
        );

        return;

      }



      setLogs(data ?? []);

    }



    loadProgress();

  }, []);




  const completedSets =
    logs.filter(
      (log) => log.completed,
    ).length;




  const totalVolume =
    logs.reduce(
      (total, log) =>
        total +
        log.weight *
        log.reps,

      0,
    );




  const workoutDays =
    new Set(
      logs.map(
        (log) =>
          log.workout_date,
      ),
    ).size;




  const stats = [

    {
      label: "Workouts",
      value: workoutDays.toString(),
      description: "Completed training days",
    },


    {
      label: "Sets Completed",
      value: completedSets.toString(),
      description: "Finished exercise sets",
    },


    {
      label: "Total Volume",
      value: `${totalVolume} kg`,
      description: "Total lifted weight",
    },

  ];




  return (

    <main
      className="
      min-h-screen
      bg-[#050505]
      px-4
      py-6
      text-white
      sm:px-6
      sm:py-8
      lg:px-8
      lg:py-10
      "
    >

      <div
        className="
        mx-auto
        w-full
        max-w-5xl
        space-y-6
        "
      >



        <ProgressHeader />



        <ProgressStats
          stats={stats}
        />



        <StrengthProgress
          items={
            progressData.strengthProgress
          }
        />



        <TrainingActivity
          activity={
            progressData.trainingActivity
          }
        />



        <PersonalRecords
          records={
            progressData.personalRecords
          }
        />



      </div>


    </main>

  );

}