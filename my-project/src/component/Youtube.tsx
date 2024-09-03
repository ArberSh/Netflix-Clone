import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

interface DataYouTube{
    Id_YT:string;
  }

function VideoPlayer() {
    
        const [opts, setOpts] = useState({
            height: window.innerWidth < 480 ? '180' : window.innerWidth < 768 ? '340' : '500',
            width: window.innerWidth < 480 ? '300' : window.innerWidth < 768 ? '600' : '900',
        });
  const [DataYT,SetDataYT] = useState<DataYouTube[]>([])
  const [Loading,setLoading] = useState(true)
  const {id} = useParams()
        

    useEffect(()=>{
        async function GetDataYoutube() {
          try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=1d64987033e87e832914c3294d337cef`)
            console.log(response.data.results[0].key)
            SetDataYT([{ Id_YT: response.data.results[0].key }]);
            console.log(DataYT[0])
            setLoading(false)
          }
          catch(error){
            console.log(error)
          }
        }
        GetDataYoutube()
      },[])
      

    useEffect(() => {
        const handleResize = () => {
            setOpts({
                height: window.innerWidth < 640 ? '180' : window.innerWidth < 940 ? '340' : '500',
                width: window.innerWidth < 640 ? '300' : window.innerWidth < 940 ? '600' : '900',
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (Loading) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }    

    return (
    <>
        {Loading ? ( <div className='bg-black h-screen shimmer'></div>) : (
            <div>
    <YouTube videoId={DataYT[0].Id_YT} opts={opts} />
    </div>
        )}
    </>
    
    );
};

export default VideoPlayer;