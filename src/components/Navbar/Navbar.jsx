import React from 'react'

const Navbar = () => {
    return (
        <div className='top-0 flex w-screen h-auto justify-center items-center z-50 fixed '>
        <nav className="z-50 fixed top-0 px-16 py-6 flex justify-between items-center w-full">
            <a className="text-3xl font-bold leading-none" href="#">
                <p className='text-3xl '>SCANX</p>
            </a>
            <div className="lg:hidden">
                <button className="navbar-burger flex items-center text-blue-600 p-3">
                    <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
           
            <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2.5 px-5 bg-[#f1f3f5] hover:bg-[#ddd] text-4 text-gray-900 font-bold  rounded-full transition duration-200" href="/login">Log In</a>
          
        </nav>
        </div>
    )
}

export default Navbar
