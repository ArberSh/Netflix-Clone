import React, { useState } from "react";
import Logo from "../src/assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png";

function Introduction() {
  const [clicked, SetClicked] = useState<Boolean>(false);
  const [SignInclicked, SetSignInClicked] = useState<Boolean>(false);

  function Clicked() {
    console.log("click");
    SetClicked(true);
  }

  function SignInClicked(){
    SetSignInClicked(true);
  }

  return (
    <div className=" bg-no-repeat bg-cover bg-Background-Netflix h-screen">
      <div className=" flex justify-between items-center px-4">
        <img className="w-36" src={Logo} alt="" />
        <button onClick={SignInClicked} className=" font-semibold text-white w-20 h-10 bg-red">
          Sign In
        </button>
      </div>
      {clicked ? (
        <div className="flex flex-col justify-center  items-center">
          <div className=" p-10 bg-black flex flex-col items-start">
            <h1 className="text-white text-3xl font-bold">Sign Up</h1>
            <div className="h-12 w-80 gap-4 flex my-4">
              <input
                className="px-2 w-full rounded flex justify-around outline-none "
                type="text"
                name=""
                id=""
                placeholder="Name"
                required
              />
              <input
                className="px-2 w-full rounded outline-none"
                type="text"
                name=""
                id=""
                placeholder="Last Name"
                required
              />
            </div>
            <input
              className="px-2 rounded h-12  mb-4 w-full outline-none"
              type="email"
              name=""
              id=""
              placeholder="Email"    
              required          
            />
            <input
              className="px-2 rounded h-12  mb-4 w-full outline-none"
              type="password"
              name=""
              id=""
              placeholder="Password"
              required
            />
            <input
              className="px-2 rounded h-12  mb-4 w-full outline-none"
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
              required
            />
            <input type="submit"/>
            <div className="flex gap-6 mt-2">
              <p className="text-gray font-bold">Already Have an account?</p>
              <button className="text-white font-bold">Sign In Now</button>
            </div>
          </div>
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
            onClick={Clicked}
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
