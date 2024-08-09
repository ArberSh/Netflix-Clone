import React, { useState,useEffect, ChangeEvent } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Logo from "../src/assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png";
import { auth,db } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingImg from './assets/loading.png'
import { doc, setDoc, collection,getDoc } from "firebase/firestore"; 


type FormFields = {
    Firstname:string;
    Lastname:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
}

interface IntroductionProps {
  SetFirstName: (value: string) => void;
  SetLastName: (value: string) => void;
}



function Introduction({SetFirstName, SetLastName} : IntroductionProps ) {

  
    const [Loading, SetLoading] = useState<Boolean>(false)
    
    const [clicked, SetClicked] = useState<Boolean>(false);
    const [SignInclicked, SetSignInClicked] = useState<Boolean>(false);
    const [ErrorMessage,setErrorMessage] = useState<boolean>(false)
    const [Email,SetEmail] = useState<string>("")
    const [Password,SetPassword] = useState<string>("")
    const [Firstname,SetFirstname] = useState<string>("")
    const [Lastname,SetLastname] = useState<string>("")

    const { register,handleSubmit,formState:{errors},watch,setValue,getValues } = useForm<FormFields>();
    const navigate = useNavigate();
    
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        setValue("Email", data.Email);
        setValue("Password", data.Password);
        setValue("Firstname", data.Firstname);
        setValue("Lastname", data.Lastname);
        SignUp(data.Email, data.Password,data.Firstname,data.Lastname);
    }

    async function SignUp(Email: string, Password: string, Firstname: string, Lastname: string) {
    try {
      SetLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
      const user = userCredential.user;

      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, {
        FirstName: Firstname,
        LastName: Lastname,
        Email: Email,
      });

      // Retrieve the document to verify it was added
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        console.log(userData?.FirstName); // Logs the FirstName to the console
        SetFirstName(userData?.FirstName);
        SetLastName(userData?.LastName);
      }

      navigate('/HomePage');
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
      if (error instanceof Error) {
        if (error.message.includes('auth/email-already-in-use')) {
          setErrorMessage(true);
        } else {
          setErrorMessage(false);
        }
      }
    } finally {
      SetLoading(false);
    }
  }


  function FromSignInToSignUp(){
    SetSignInClicked(false)
  }

  function GetStarted() {
    SetClicked(true);
  }

  function SignInClicked(){
    SetSignInClicked(true);
    SetClicked(true)
  }
  console.log(Password)
  console.log(Email)

  async function SignIn(){
    try{
    SetLoading(true)
    const userCredential = await signInWithEmailAndPassword(auth, Email, Password)
      SetLoading(false)
        const user = userCredential.user;
        const userRef = doc(collection(db, 'users'), user.uid);

      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        SetFirstName(userData?.FirstName);
        SetLastName(userData?.LastName);
      }
      navigate('/HomePage')
    }
    catch(error:any){
      SetLoading(false)
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/invalid-email') {
      setErrorMessage(true);
      console.log('error')
    } else {
      setErrorMessage(false);
    }
      console.error(errorCode, errorMessage);
  }
  }

  

  return (
    <div  className=" bg-no-repeat bg-cover bg-Background-Netflix h-screen">
      <div className={`flex justify-between items-center px-4  `}>
        <img className="w-36" src={Logo} alt="" />
        <button onClick={SignInClicked} className=" font-semibold text-white w-20 h-10 bg-red">
          Sign In
        </button>
      </div>
      {clicked ? (
        <div className={` flex flex-col justify-center  items-center `}>
          <div  className={` p-10 bg-black flex flex-col items-start ${SignInclicked ? "hidden" : "flex"}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`  bg-black flex-col items-start ${SignInclicked ? "hidden" : "flex"}`}>
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
              className={`px-2 rounded h-12 w-full outline-none ${(errors.Email || ErrorMessage) ? ("mb-2"):("mb-4")} `}
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
              {ErrorMessage && <div className="text-red mb-2 font-bold">Email is already used</div>}
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
              
            <button type="submit" className=" flex items-center justify-center my-2 w-full bg-red px-6 py-2 text-white text-lg font-bold">
              {Loading ? (<img className="w-7 animate-spin text-center" src={LoadingImg}></img>) : ("Sign Up")}
            </button>
            </form>

            <div className={` gap-6 mt-2 ${SignInclicked ? "hidden" : "flex"}`}>
              <p className="text-gray font-bold">Already Have an account?</p>
              <button onClick={SignInClicked} className="text-white font-bold">Sign In Now</button>
            </div>
           </div>
        </div>
      ) : (
        <div className={`px-6 flex justify-center items-center flex-col h-3/4 text-center ${SignInclicked ? "hidden" : "flex"}`}>
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
      {SignInclicked && 
          <div className="flex justify-center items-center h-3/5">
           <div className=" p-10 bg-black flex flex-col items-start">
            <div className=" flex flex-col items-start">
            <h1 className="text-white text-3xl font-bold">Sign Up</h1>
            <div className={`flex-col w-80  flex mt-4 `}>
            <input
              className={`px-2 rounded h-12 w-full outline-none ${(errors.Email || ErrorMessage) ? ("mb-2"):("mb-4")} `}
              type="text"
              placeholder="Email"  
                   
              {...register("Email",{
                required:"Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  }
                  
              })}
              onInput={(e) => SetEmail((e.target as HTMLInputElement).value)}
            />
              {(errors.Email || ErrorMessage)  && <div className="text-red mb-2 font-bold">Email is Invalid or Incorrect!</div>}
              <input 
              className={`px-2 rounded h-12  w-full outline-none ${errors.Password ? ("mb-2"):("mb-4")}`}
              type="password"
              placeholder="Password"
              {...register("Password",{
                required:"Password is required",
                minLength:{
                    value: 8,
                    message: "Password must be 8 characters long"
                },
                pattern: /^.{8,}$/
              })}
              onInput={(e) => SetPassword((e.target as HTMLInputElement).value)}
              />
              {(errors.Password || ErrorMessage) && <div className="text-red mb-2 font-bold">Password is incorrect!</div>}
              </div>
              <button onClick={SignIn} className="my-2 w-full bg-red px-6 py-2 text-white text-lg font-bold flex justify-center items-center">{Loading ? (<img className="w-7 animate-spin text-center" src={LoadingImg}></img>) : ("Sign In")}</button>
              <div className="px-2 flex justify-between items-center w-full">
              <p className="text-gray font-bold">Don't have an account? </p>
              <button className="text-white font-bold" onClick={FromSignInToSignUp}>Sign Up</button>
              </div>
            </div>
          </div>
    </div>}
    </div>
  );
}

export default Introduction;