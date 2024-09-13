import React, { useEffect, useState } from 'react'
import NetflixLogo from "../assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png";
import SearchLogo from "../assets/SearchLogo.svg";
import ProfileLogo from "../assets/ProfileLogo.png";
import LogOut from "../assets/LogOut.svg";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from 'react-router-dom';




function Navigation() {
    const [scroll,setScroll] = useState<boolean>(false)
    const [Input, setInput] = useState('');
    const navigate = useNavigate();
    

    function SignOut(){
      navigate(`/`)
  };

    function Scroll() {
        if (window.scrollY >= 10) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      }

      function Clicked(){
        alert('clicked')
      }
      
      const Enter = (e:any) => {
        if (e.key === "Enter") {
          Click();
        }
      };

      const Click = () => {
        if (Input.length == 0) {
          alert('error')
        } else {
          navigate(`/Search/${Input}`)
          window.location.reload()
        }
        console.log(Input)
      };
     
    
      useEffect(() => {
        window.addEventListener("scroll", Scroll);
        return () => {
          window.removeEventListener("scroll", Scroll);
        };
      }, [window.scrollY]);
  return (
    <div className={`fixed top-0 left-0 right-0 w-screen flex flex-row justify-center items-center px-4 z-30 transition-all duration-200 ${scroll ? 'bg-black' : 'transparent'}`}>
        <Link to={'/Homepage'}>
            <img
              className="w-40 min-w-28 max-[640px]:w-28"
              src={NetflixLogo}
              alt="Netflix Logo"
            />
            </Link>
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={Enter}
              type="text"
              className="mx-6 bg-black bg-opacity-0 w-full max-w-160 text-white outline-none h-6 text-lg"
              placeholder="Movies Tv Shows Search History"
            />
            <div className="flex justify-center items-center">
              <button onClick={Clicked} className="px-2">
                <img className="min-w-6" src={SearchLogo} alt="" />
              </button>
              <Link to={'/Account'} className="px-2">
                <img className="w-6 min-w-6" src={ProfileLogo} alt="" />
              </Link>
              <button onClick={SignOut} className="px-2">
                <img className="min-w-6" src={LogOut} alt="" />
              </button>
            </div>
          </div>
  )
}

export default Navigation