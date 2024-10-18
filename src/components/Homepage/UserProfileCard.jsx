import React, { useState, useEffect } from "react";
import { randomImages } from "../../../public/images";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

import { useAccount } from 'wagmi';

const UserProfileCard = () => {
  // State for user profile data
  const [username, setUsername] = useState("John Doe");
  const [editingName, setEditingName] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);

  // Get the connected account address
  const { address, isConnected } = useAccount();

  // Check if there is a saved profile image and name in localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedName = localStorage.getItem("username");

    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      const randomImage =
        randomImages[Math.floor(Math.random() * randomImages.length)];
      setProfileImage(randomImage);
      localStorage.setItem("profileImage", randomImage);
    }

    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  // Handle file upload (local image)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result); // Save uploaded image to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name edit
  const handleNameChange = (e) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value); // Save name to localStorage
  };

  return (
    <div className="absolute top-0 right-0 mt-6 mr-6 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg w-full max-w-md text-center">
      {/* User Profile Image */}
      <div className="relative flex justify-center mb-4">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-24 h-24 rounded-full shadow-md cursor-pointer z-10"
          onClick={() => setShowImageOptions(!showImageOptions)}
        />
        {showImageOptions && (
          <div
            className="absolute top-full mt-2 bg-white p-4 rounded-lg shadow-lg z-50 w-64"
            style={{ pointerEvents: 'auto' }} // Prevent clicks on underlying elements
          >
            <div className="space-y-2">
              <button
                onClick={() => {
                  const randomImage =
                    randomImages[Math.floor(Math.random() * randomImages.length)];
                  setProfileImage(randomImage);
                  localStorage.setItem("profileImage", randomImage);
                }}
                className="block w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Random Image
              </button>
              <label className="block w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* User Name */}
      <div className="text-2xl font-semibold">
        {editingName ? (
          <input
            type="text"
            value={username}
            onChange={handleNameChange} // Update name and save to localStorage
            onBlur={() => setEditingName(false)}
            className="border-b-2 border-gray-300 focus:outline-none bg-transparent text-white"
          />
        ) : (
          <span onClick={() => setEditingName(true)} className="cursor-pointer">
            {username}
          </span>
        )}
      </div>

      {/* Check if account is connected */}
      {isConnected ? (
        // Show wallet information
        <div className="mt-4 ml-32">
          <ConnectWallet text="Sign Up" className='bg-white text-black font-semibold py-2 rounded-full shadow hover:bg-gray-200 transition justify-center'>
    <Avatar className="h-6 w-6" />
    <Name />
  </ConnectWallet>
        </div>
      ) : (
        // Show Connect Wallet button
        <div className="mt-4 ml-32">
          <ConnectWallet
            text="Connect Wallet"
            className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 transition justify-center"
          />
        </div>
      )}

      {/* Dashboard Button */}
      <div className="space-y-4 mt-6">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full flex items-center justify-center bg-white/10 text-white font-semibold py-2 rounded-full shadow hover:bg-white/20 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
