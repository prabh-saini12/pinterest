import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  async function RegisterUser(name,email, password, navigate,fetchPins) {
    setBtnLoading(true);
    try {
      const {data} =await axios.post(`${apiUrl}/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true)
      setBtnLoading(false);
      navigate("/")
      fetchPins()
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }



  async function LoginUser(email, password, navigate,fetchPins) {
    setBtnLoading(true);
    try {
      const {data} =await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      },{ withCredentials: true });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true)
      setBtnLoading(false);
      navigate("/")
      fetchPins()
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const [loading,setLoading]= useState(true)

  async function fetchUser(){
    try {
        const {data} =await axios.get(`${apiUrl}/user/me`,{ withCredentials: true })
        // console.log(data);
        
        setUser(data.user)
        setIsAuth(true)
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
        
    }
  }


  async function followUser(id, fetchUser) {
    try {
      const { data } = await axios.post(`${apiUrl}/user/follow/${id}`);


      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }



  useEffect(()=>{
    fetchUser()
  },[])


  return (
    <UserContext.Provider value={{ LoginUser, btnLoading,isAuth,user,loading,RegisterUser,setIsAuth,setUser,   followUser,  }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
