import Navigation from './component/Navigation'
import ProfileLogo from './assets/ProfileLogo.png'

type FormFields = {
    FirstName:string;
    LastName:string;
    Email:string;
}

function Account({FirstName,LastName,Email} : FormFields) {
    function Alert(){
        alert("Haven't got yet around to doing this :/")
    }

  return (
    <>
    <div className='bg-black h-screen justify-center flex items-center'>
        <Navigation></Navigation>
        <div className='max-w-160 w-full'>
            <h1 className='text-white text-6xl '>Edit Profile</h1>
            <hr className='w-full text-gray my-4' />
            <div className='flex justify-around items-start '>
                <div className='flex justify-center items-center'>
                    <img className='w-28' src={ProfileLogo} alt="" />
                </div>
                <div className='flex flex-col justify-start items-start text-white max-w-96 w-full'>
                    <div className='flex  gap-4 '>
                    <h1 className='font-semibold text-lg'>{FirstName}</h1>
                    <h1 className='font-semibold text-lg'>{LastName}</h1>
                    </div>
                    <h1 className='font-semibold text-lg pb-4'>{Email}</h1>
                    <div className='w-full'>
                        <h1 className='font-bold text-xl'>Plans</h1>
                        <hr className='w-full text-gray my-2'/>
                        <div className='flex justify-between items-center  w-full flex-col'>
                            <div className='flex justify-between items-center w-full pb-6'>
                            <div className='flex flex-col font-semibold'>
                            <h1>Basic</h1>
                            <h2>720p</h2>
                            </div>
                            <div>
                                <button onClick={(Alert)} className='bg-red py-2 px-4 text-white font-semibold'>Subscribe</button>
                            </div>
                            </div>
                            <div className=' justify-between items-center w-full flex pb-6'>
                            <div className='flex flex-col font-semibold'>
                                <h1>Standard</h1>
                                <h2>1080p</h2>
                            </div>
                            <div>
                                <button onClick={(Alert)} className='bg-red py-2 px-4 text-white font-semibold'>Subscribe</button>
                            </div>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                            <div className='flex flex-col font-semibold'>
                            <h1>Premium</h1>
                            <h2>4k + HDR</h2>
                            </div>
                            <div>
                                <button onClick={(Alert)} className='bg-red py-2 px-4 text-white font-semibold'>Subscribe</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Account