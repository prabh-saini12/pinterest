import axios from "../axiosConfig";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { data } = await axios.get(
        `${apiUrl}/user/${params.id}`
      );
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [isFollow, setIsFollow] = useState(false);

  const { followUser } = UserData();

  const followHander = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    if (user && user.followers && user.followers.includes(loggedInUser._id)) {
      setIsFollow(true);
    }
  }, [user, loggedInUser._id]);

  const { pins } = PinData();

  let userPins = [];
  if (pins && user) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      {user && (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
          {/* Profile Image */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-300 flex items-center justify-center">
              {user.name && (
                <span className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
                  {user.name.slice(0, 1)}
                </span>
              )}
            </div>
          </div>

          {/* User Details */}
          <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-center text-gray-600 mb-4">{user.email}</p>
          <div className="flex justify-center items-center gap-4 text-gray-600 mb-4">
            {user.followers && <span className="text-sm sm:text-base lg:text-lg">{user.followers.length} followers</span>}
            {user.following && <span className="text-sm sm:text-base lg:text-lg">{user.following.length} following</span>}
          </div>

          {/* Follow/Unfollow Button */}
          {user._id !== loggedInUser._id && (
            <div className="flex justify-center mt-4">
              <button
                onClick={followHander}
                className={`px-4 py-2 rounded text-white ${isFollow ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-700"}`}
              >
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}

          {/* User Pins */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userPins.length > 0 ? (
              userPins.map((e) => <PinCard key={e._id} pin={e} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">No Pins Yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
