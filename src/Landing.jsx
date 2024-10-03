import {ArrowRight} from 'lucide-react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'

function Landing() {
  return (
    <div id='root' className='w-full h-screen flex justify-center items-center bg-[#1e1e1e]'>
      
      <Navbar />
      <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen bg-black">
      
        <div className="flex justify-center h-full blur-main ">
        <div className="flex justify-center w-[1400px] h-[1400px] absolute top-[-1100px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
        </div>
        <div className="absolute top-[30vh] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
          UNVEIL THE REAL
        </div>
        <div className="absolute top-[45vh] text-[50px] 2xl:text-[60px] font-extrabold">
          DETECTING DEEPFAKES WITH PRECISION
        </div>

        <div className="absolute top-[60vh] 2xl:text-[15px] text-[13px] font-extrabold px-36 w-[60vw] text-center text-gray-400">
        LEVERAGING THE POWER OF BLOCKCHAIN AND MACHINE LEARNING FOR DETECTION OF DEEP FAKE VIDEOS OVER THE INTERNET!
        </div>

        <div className="absolute top-[75vh] flex gap-28 w-[40vw]">
          <button className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition" onClick={()=>{
            window.location.href = '/login'
          }}>
            <div className='flex items-center gap-2'>TRY NOW <ArrowRight size={20} /></div>
          </button>
          <button className="border-2 border-white px-4 py-4 text-[1.8vw] w-1/2 text-xl rounded-lg transition font-semibold hover:scale-110 hover:translate-y-[-10px]">HOW IT WORKS</button>
        </div>

      </div>

    </div>
  )
}

export default Landing