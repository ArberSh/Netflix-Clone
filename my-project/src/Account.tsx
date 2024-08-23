import React from 'react'
import Navigation from './component/Navigation'
import ProfileLogo from './assets/ProfileLogo.png'

function Account() {
  return (
    <>
    <div className='bg-black h-screen justify-center flex items-center'>
        <Navigation></Navigation>
        <div className='max-w-160 w-full'>
            <h1 className='text-white text-6xl pb-2'>Edit Profile</h1>
            <hr className='w-full text-gray'/>
            <div className='flex justify-around items-start '>
                <div className='flex justify-center items-center'>
                    <img className='w-36' src={ProfileLogo} alt="" />
                </div>
                <div className='flex flex-col justify-start items-start text-white m-4 max-w-96 w-full'>
                    <div className='flex  gap-4 '>
                    <h1>Name</h1>
                    <h1>Surnamess</h1>
                    </div>
                    <h1>Email@email.com</h1>
                    <div className='w-full'>
                        <h1>Plans</h1>
                        <div className='flex justify-between items-center  w-full flex-col'>
                            <div className='flex'>
                            <div className='flex flex-col w-20'>
                                Premium
                                4k + HDR
                            </div>
                            </div>
                            <div>
                                <button>Subscribe</button>
                            </div>
                            <div className='flex flex-col w-20'>
                                Premium
                                4k + HDR
                            </div>
                            <div>
                                <button>Subscribe</button>
                            </div>
                            <div className='flex flex-col w-20'>
                                Premium
                                4k + HDR
                            </div>
                            <div>
                                <button>Subscribe</button>
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