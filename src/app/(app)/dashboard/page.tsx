"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TodayWorkoutCard from "@/components/dashboard/TodayWorkoutCard";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import GeneratePlanButton from "@/components/dashboard/GeneratePlanButton";
import CurrentPlanCard from "@/components/dashboard/CurrentPlanCard";

import CoachRecommendation from "@/components/coach/CoachRecommendation";

import {
  generateCoachRecommendation,
} from "@/data/coach/coachEngine";

import {
  getCoachAnalysis,
} from "@/lib/coach/getCoachAnalysis";

import {
  getCurrentWorkoutPlan,
} from "@/lib/plans/getCurrentWorkoutPlan";



type Profile = {
  full_name: string | null;
  fitness_goal: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  training_days: number | null;
  session_duration: number | null;
  experience_level: string | null;
  training_location: string | null;
};



export default function DashboardPage() {


  const [profile, setProfile] =
    useState<Profile | null>(null);



  const [currentPlan, setCurrentPlan] =
    useState<{
      month: number;
      goal: string;
    } | null>(null);



  const [coachRecommendation, setCoachRecommendation] =
    useState<
      ReturnType<typeof generateCoachRecommendation> | null
    >(null);



  const [loading, setLoading] =
    useState(true);




  useEffect(() => {


    async function loadProfile() {


      try {


        const {
          data: { user },
        } =
          await supabase.auth.getUser();




        if (!user) {

          setLoading(false);
          return;

        }




        const {
          data,
          error,
        } =
          await supabase
            .from("profiles")
            .select(
              `
              full_name,
              fitness_goal,
              weight_kg,
              height_cm,
              training_days,
              session_duration,
              experience_level,
              training_location
              `,
            )
            .eq(
              "id",
              user.id,
            )
            .single();




        if (error) {

          console.error(
            "Dashboard profile error:",
            error,
          );

          return;

        }




        setProfile(data);




        const plan =
          await getCurrentWorkoutPlan();


        setCurrentPlan(plan);




        const analysis =
          await getCoachAnalysis();




        const recommendation =
          generateCoachRecommendation({

            goal:
              data.fitness_goal ??
              "Build Muscle",


            trainingDays:
              data.training_days ??
              3,


            analysis,

          });



        setCoachRecommendation(
          recommendation,
        );



      } catch (error) {


        console.error(
          "Dashboard loading error:",
          error,
        );



      } finally {


        setLoading(false);


      }


    }




    loadProfile();


  }, []);





  if (loading) {


    return (

      <main className="flex min-h-[400px] items-center justify-center">


        <p className="text-sm text-zinc-500">
          Loading dashboard...
        </p>


      </main>

    );


  }





  if (!profile) {


    return (

      <main className="flex min-h-[400px] items-center justify-center">


        <p className="text-sm text-zinc-500">
          Profile not found. Please complete your profile.
        </p>


      </main>

    );


  }





  return (


    <main className="space-y-6">



      <DashboardHeader

        name={
          profile.full_name ?? "Athlete"
        }

      />


      <ProgressSummary

        profile={profile}

      />





      <CurrentPlanCard

        plan={currentPlan}

      />





      {coachRecommendation && (

        <CoachRecommendation

          recommendation={
            coachRecommendation
          }

        />

      )}






      <GeneratePlanButton />






      <div className="grid gap-6 lg:grid-cols-2">



        <TodayWorkoutCard

          profile={profile}

        />




        <RecommendationCard

          profile={profile}

        />



      </div>




    </main>


  );

}