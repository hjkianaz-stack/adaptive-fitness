"use client";

import { useState } from "react";

import {
  generateMonthlyPlan,
} from "@/lib/plans/generateMonthlyPlan";


export default function GeneratePlanButton() {

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");



  async function handleGenerate() {

    try {

      setLoading(true);

      setMessage("");



      await generateMonthlyPlan();



      setMessage(
        "New monthly workout plan generated successfully.",
      );



    } catch (error) {


      console.error(
        "Generate monthly plan error:",
        JSON.stringify(
          error,
          null,
          2,
        ),
      );



      setMessage(

        error instanceof Error

          ? error.message

          : "Failed to generate workout plan.",

      );



    } finally {

      setLoading(false);

    }

  }



  return (

    <div>

      <button

        type="button"

        onClick={handleGenerate}

        disabled={loading}

        className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"

      >

        {
          loading
            ? "Generating..."
            : "Generate New Monthly Plan"
        }


      </button>



      {
        message && (

          <p className="mt-3 text-sm text-zinc-500">

            {message}

          </p>

        )
      }


    </div>

  );

}