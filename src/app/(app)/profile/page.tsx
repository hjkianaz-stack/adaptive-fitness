"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformation from "@/components/profile/PersonalInformation";
import FitnessGoals from "@/components/profile/FitnessGoals";
import TrainingPreferences from "@/components/profile/TrainingPreferences";
import NutritionPreferences from "@/components/profile/NutritionPreferences";

import { supabase } from "@/lib/supabase";
import { profileData } from "@/data/profile";


export default function ProfilePage() {

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState(profileData);

  const [backupProfile, setBackupProfile] = useState(profileData);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [saveError, setSaveError] = useState("");



  useEffect(() => {

    async function loadProfile() {

      const {
        data: { user },
      } = await supabase.auth.getUser();



      if (!user) {

        setLoading(false);

        return;

      }



      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();



      if (error) {

        console.error(
          "Error loading profile:",
          error
        );

        setLoading(false);

        return;

      }



      if (data) {

        const loadedProfile = {

          personal: {

            fullName:
              data.full_name ?? "",

            email:
              user.email ?? data.email ?? "",

            age:
              data.age?.toString() ?? "",

            height:
              data.height_cm?.toString() ?? "",

            weight:
              data.weight_kg?.toString() ?? "",

            gender:
              data.gender ?? "",

          },


          fitnessGoal:
            data.fitness_goal ?? "Build Muscle",



          training: {

            trainingDays:
              data.training_days
                ? `${data.training_days} days/week`
                : "4 days/week",


            sessionDuration:
              data.session_duration
                ? `${data.session_duration} min`
                : "60 min",


            trainingLocation:
              data.training_location ?? "Gym",


            experienceLevel:
              data.experience_level ?? "Intermediate",

          },



          nutrition: {

            dietPreference:
              data.diet_preference ?? "Balanced",


            dailyMeals:
              data.daily_meals?.toString() ?? "4",


            waterGoal:
              data.water_goal
                ? `${data.water_goal} L`
                : "2.5 L",

          },

        };


        setProfile(loadedProfile);

        setBackupProfile(loadedProfile);

      }



      setLoading(false);

    }



    loadProfile();

  }, []);





  const handleEdit = () => {

    setBackupProfile(profile);

    setSaveError("");

    setEditing(true);

  };





  const handleSave = async () => {

    setSaveError("");

    setSaving(true);



    const {
      data: { user },
    } = await supabase.auth.getUser();



    if (!user) {

      setSaveError(
        "You must be signed in to save your profile."
      );

      setSaving(false);

      return;

    }



    const { error } =
      await supabase
        .from("profiles")
        .upsert({

          id: user.id,


          full_name:
            profile.personal.fullName,


          email:
            user.email ?? profile.personal.email,


          age:
            profile.personal.age
              ? Number(profile.personal.age)
              : null,


          height_cm:
            profile.personal.height
              ? Number(profile.personal.height)
              : null,


          weight_kg:
            profile.personal.weight
              ? Number(profile.personal.weight)
              : null,


          gender:
            profile.personal.gender || null,


          fitness_goal:
            profile.fitnessGoal,


          training_days:
            Number.parseInt(
              profile.training.trainingDays,
              10
            ),


          session_duration:
            Number.parseInt(
              profile.training.sessionDuration,
              10
            ),


          training_location:
            profile.training.trainingLocation,


          experience_level:
            profile.training.experienceLevel,


          diet_preference:
            profile.nutrition.dietPreference,


          daily_meals:
            Number(profile.nutrition.dailyMeals),


          water_goal:
            Number.parseFloat(profile.nutrition.waterGoal),


          updated_at:
            new Date().toISOString(),

        });



    if (error) {

      console.error(error);


      setSaveError(
        "Unable to save your profile. Please try again."
      );


      setSaving(false);

      return;

    }



    setBackupProfile(profile);

    setEditing(false);

    setSaving(false);

  };





  const handleCancel = () => {

    setProfile(backupProfile);

    setSaveError("");

    setEditing(false);

  };





  if (loading) {

    return (

      <main className="flex min-h-[400px] items-center justify-center bg-[#050505]">

        <p className="text-sm text-zinc-400">
          Loading profile...
        </p>

      </main>

    );

  }





  return (

    <main className="space-y-6">


      <ProfileHeader

        name={profile.personal.fullName}

        email={profile.personal.email}

        editing={editing}

        onEdit={handleEdit}

        onSave={handleSave}

        onCancel={handleCancel}

      />



      <section>

        <h2 className="text-xl font-semibold text-white">
          Profile
        </h2>


        <p className="mt-1 text-sm text-zinc-400">
          Manage your personal information, training preferences and goals.
        </p>


      </section>





      {saveError && (

        <div className="rounded-xl border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">

          {saveError}

        </div>

      )}





      {saving && (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">

          Saving your profile...

        </div>

      )}





      <PersonalInformation

        editable={editing && !saving}

        data={profile.personal}

        onChange={(field, value) =>

          setProfile((current) => ({

            ...current,

            personal: {

              ...current.personal,

              [field]: value,

            },

          }))

        }

      />





      <FitnessGoals

        editable={editing && !saving}

        selectedGoal={profile.fitnessGoal}

        onChange={(goal) =>

          setProfile((current) => ({

            ...current,

            fitnessGoal: goal,

          }))

        }

      />





      <TrainingPreferences

        editable={editing && !saving}

        data={profile.training}

        onChange={(field, value) =>

          setProfile((current) => ({

            ...current,

            training: {

              ...current.training,

              [field]: value,

            },

          }))

        }

      />





      <NutritionPreferences

        editable={editing && !saving}

        data={profile.nutrition}

        onChange={(field, value) =>

          setProfile((current) => ({

            ...current,

            nutrition: {

              ...current.nutrition,

              [field]: value,

            },

          }))

        }

      />


    </main>

  );

}