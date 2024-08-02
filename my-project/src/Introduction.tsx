import React, { useState,useEffect } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Logo from "../src/assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png";
import { auth } from "./init";
import { createUserWithEmailAndPassword } from "firebase/auth";

type FormFields = {
    Firstname:string;
    Lastname:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
}


function Introduction() {
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');    
    
    const [clicked, SetClicked] = useState<Boolean>(false);
    const [SignInclicked, SetSignInClicked] = useState<Boolean>(false);

    const { register,handleSubmit,formState:{errors},watch,setValue } = useForm<FormFields>();
    
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        setValue("Email", data.Email);
        setValue("Password", data.Password);
    }


    function SignUp(){
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((user)=> {
        console.log(user);
    
    }).catch((error)=>{
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage);
    })
  }

  function GetStarted() {
    SetClicked(true);
  }

  function SignInClicked(){
    SetSignInClicked(true);
  }

  return (
    <div  className=" bg-no-repeat bg-cover bg-Background-Netflix h-screen">
      <div className=" flex justify-between items-center px-4">
        <img className="w-36" src={Logo} alt="" />
        <button onClick={SignInClicked} className=" font-semibold text-white w-20 h-10 bg-red">
          Sign In
        </button>
      </div>
      {clicked ? (
        <div className="flex flex-col justify-center  items-center">
          <form onSubmit={handleSubmit(onSubmit)} className=" p-10 bg-black flex flex-col items-start">
            <h1 className="text-white text-3xl font-bold">Sign Up</h1>
            <div className={` w-80 gap-4 flex mt-4 ${errors.Firstname || errors.Lastname ? "mb-2" : "mb-4"}`}>
                 
              <input
                className="px-2 w-full h-12 rounded flex justify-around outline-none "
                type="text"
                id=""
                placeholder="Name"
                {...register("Firstname" , {
                    required:"First Name And Last Name is required"
                })}
              />
              
              <input
                className="h-12 px-2 w-full rounded outline-none"
                type="text"
                id=""
                placeholder="Last Name"
                {...register("Lastname",{
                    required:"First Name And Last Name is required"
                })}
                />
            </div>
                {errors.Firstname ? (<div className="text-red mb-2 font-bold">{errors.Firstname.message}</div>):
                (errors.Lastname && <div className="text-red mb-2 font-bold">{errors.Lastname.message}</div>)}
            <input
              className={`px-2 rounded h-12 w-full outline-none ${errors.Email ? ("mb-2"):("mb-4")} `}
              type="text"
              id=""
              placeholder="Email"        
              {...register("Email",{
                required:"Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  }
              })}
            />
              {errors.Email && <div className="text-red mb-2 font-bold">{errors.Email.message}</div>}
            <input
              className={`px-2 rounded h-12  w-full outline-none ${errors.Password ? ("mb-2"):("mb-4")}`}
              type="password"
              id=""
              placeholder="Password"
              {...register("Password",{
                required:"Password is required",
                minLength:{
                    value: 8,
                    message: "Password must be 8 characters long"
                },
                pattern: /^.{8,}$/
              })}
              />
              {errors.Password && <div className="text-red mb-2 font-bold">{errors.Password.message}</div>}
            <input
              className="px-2 rounded h-12  mb-4 w-full outline-none"
              type="password"
              id=""
              placeholder="Confirm Password"
              {...register("ConfirmPassword",{required:"Confirm Password is required",validate: (val:string) => {if(watch('Password') != val){
                return "Your password do not match";
              }}
               
              })}
              
            />
              {errors.ConfirmPassword && <div className="text-red mb-2 font-bold">{errors.ConfirmPassword.message}</div>}

            <button onClick={SignUp} className="my-2 w-full bg-red px-6 py-2 text-white text-lg font-bold">
              Sign Up
            </button>
            <div className="flex gap-6 mt-2">
              <p className="text-gray font-bold">Already Have an account?</p>
              <button className="text-white font-bold">Sign In No</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-6 flex justify-center items-center flex-col h-3/4 text-center">
          <h1 className="font-bold text-3xl text-white">
            Unlimited films, TV programmes and more.
          </h1>
          <h3 className="mt-4 text-3xl text-white">
            Watch anywhere. Cancel at any time.
          </h3>
          <h3 className="mt-4 text-xl text-white">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <button
            onClick={GetStarted}
            className="w-36 h-12 bg-red font-bold text-white mt-4"
          >
            GET STARTED
          </button>
        </div>
      )}
    </div>
  );
}

export default Introduction;
