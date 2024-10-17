import React, { useState } from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from '../axiosConfig';
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import ConfirmationModal from "../components/ConfirmationModal"; 

const Account = ({ user }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { setIsAuth, setUser } = UserData();
  const { pins } = PinData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/user/logout`);
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    logoutHandler();
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
   
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
              {user.name.slice(0, 1)}
            </span>
          </div>
        </div>

        <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-center text-gray-600 mb-4">{user.email}</p>
        <div className="flex justify-center items-center gap-4 text-gray-600 mb-4">
          <span className="text-sm sm:text-base lg:text-lg">Followers: {user.followers.length}</span>
          <span className="text-sm sm:text-base lg:text-lg">Following: {user.following.length}</span>
        </div>


        <div className="flex justify-center mt-4">
          <button
            onClick={openConfirmationModal}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Logout
          </button>
        </div>

  
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userPins && userPins.length > 0 ? (
            userPins.map((e) => <PinCard key={e._id} pin={e} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No Pins Yet</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default Account;
