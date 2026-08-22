"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  supabase,
} from "@/lib/supabase";


export default function HomePage(){

  const router =
    useRouter();



  useEffect(()=>{


    async function checkUser(){


      const {
        data:{
          session,
        },
      } =
        await supabase.auth.getSession();



      /*
      |--------------------------------------------------------------------------
      | Existing logged in user
      |--------------------------------------------------------------------------
      */


      if(session){

        router.replace(
          "/dashboard",
        );

        return;

      }



      /*
      |--------------------------------------------------------------------------
      | Check if browser has visited before
      |--------------------------------------------------------------------------
      */


      const hasVisited =
        localStorage.getItem(
          "fitpilot_visited",
        );



      if(hasVisited){


        router.replace(
          "/login",
        );


      }else{


        localStorage.setItem(
          "fitpilot_visited",
          "true",
        );


        router.replace(
          "/signup",
        );

      }


    }



    checkUser();


  },[router]);



  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
      "
    >

      <div
        className="
          text-center
          text-white
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          FitPilot
        </h1>


        <p
          className="
            mt-3
            text-zinc-400
          "
        >
          Loading...
        </p>


      </div>


    </main>

  );

}