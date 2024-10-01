import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/deeptrace_logo_transparent.png';
import ConnectButton from '../../Contexts/AppKitProvider';
import Loader from '../../components/Loader/Loader'; // Import the loader

function Login() {
  const [isWalletConnected, setIsWalletConnected] = useState(false); // Track wallet connection
  const [showLoader, setShowLoader] = useState(false); // Track loader visibility
  const navigate = useNavigate();

  // Function to handle wallet connection
  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    setShowLoader(true); // Show loader when wallet is connected

    // After 3 seconds, hide the loader and navigate to the home page
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      {/* Show loader if wallet is connected */}
      {showLoader && <Loader />}

      {/* Main login page content */}
      {!showLoader && (
        <div className='flex justify-center items-center gap-36'>
          <div className='flex gap-[30px]'>
            <img src={logo} className='h-16' alt="Logo" />
            <div className='text-5xl font-bold'>ScanX</div>
          </div>
          <div className='bg-[#252525] px-12 py-16 rounded-[20px]'>
            <div>
              <div className='text-sm font-semibold text-[#787878]'>Log In</div>
              <div className='text-3xl font-semibold'>Welcome Back!</div>
            </div>
            <div className='mt-8 ml-3'>
              {/* Pass handleWalletConnect as a callback to ConnectButton */}
              <ConnectButton onConnect={handleWalletConnect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
