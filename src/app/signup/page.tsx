"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  signUp,
} from "@/lib/auth";


export default function SignupPage(){


  const router =
    useRouter();


  const [email,setEmail] =
    useState("");


  const [password,setPassword] =
    useState("");


  const [confirmPassword,setConfirmPassword] =
    useState("");


  const [loading,setLoading] =
    useState(false);


  const [error,setError] =
    useState("");


  const [success,setSuccess] =
    useState("");



  async function handleSubmit(
    e:FormEvent<HTMLFormElement>,
  ){

    e.preventDefault();


    setError("");

    setSuccess("");



    if(password !== confirmPassword){

      setError(
        "Passwords do not match.",
      );

      return;

    }



    if(password.length < 6){

      setError(
        "Password must be at least 6 characters.",
      );

      return;

    }



    setLoading(true);



    const {
      data,
      error,
    } =
      await signUp(
        email,
        password,
      );



    if(error){

      setError(
        error.message,
      );

      setLoading(false);

      return;

    }



    setLoading(false);



    if(data.session){

      router.push(
        "/profile",
      );

      return;

    }



    setSuccess(
      "Account created. Please confirm your email.",
    );


  }



  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
        px-4
      "
    >


      <section
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-zinc-950
          p-8
        "
      >


        <h1
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          Create FitPilot Account
        </h1>


        <p
          className="
            mt-3
            text-sm
            text-zinc-400
          "
        >
          Start your personalized fitness journey.
        </p>



        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-4
          "
        >


          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={
              e=>setEmail(
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              bg-zinc-900
              px-4
              py-3
              text-white
            "

            required

          />



          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={
              e=>setPassword(
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              bg-zinc-900
              px-4
              py-3
              text-white
            "

            required

          />



          <input

            type="password"

            placeholder="Confirm password"

            value={confirmPassword}

            onChange={
              e=>setConfirmPassword(
                e.target.value,
              )
            }

            className="
              w-full
              rounded-xl
              bg-zinc-900
              px-4
              py-3
              text-white
            "

            required

          />



          {
            error && (

              <p
                className="
                  rounded-xl
                  bg-red-950
                  p-3
                  text-sm
                  text-red-400
                "
              >

                {error}

              </p>

            )
          }



          {
            success && (

              <p
                className="
                  rounded-xl
                  bg-green-950
                  p-3
                  text-sm
                  text-green-400
                "
              >

                {success}

              </p>

            )
          }



          <button

            disabled={loading}

            className="
              w-full
              rounded-xl
              bg-[#c7ff00]
              py-3
              font-bold
              text-black
            "

          >

            {
              loading
              ?
              "Creating..."
              :
              "Create Account"
            }


          </button>



        </form>



      </section>


    </main>

  );

}