import { supabase } from "@/lib/supabase";


export async function signUp(
  email: string,
  password: string,
) {

  return await supabase.auth.signUp({

    email,

    password,

    options: {

      emailRedirectTo:
        `${window.location.origin}/login`,

    },

  });

}



export async function signIn(
  email:string,
  password:string,
){

  return await supabase.auth.signInWithPassword({

    email,

    password,

  });

}



export async function signOut(){

  return await supabase.auth.signOut();

}



export async function getCurrentUser(){

  const {

    data:{
      user,
    },

    error,

  } =
    await supabase.auth.getUser();


  if(error){

    throw error;

  }


  return user;

}