// import axios from "../axiosConfig";
// import { useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// import toast from "react-hot-toast";

// const PinContext = createContext();

// export const PinProvider = ({ children }) => {
//   const [pins, setPins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchPins() {
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/pin/all");
//       setPins(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   const [pin, setPin] = useState([]);
//   async function fetchPin(id) {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/pin/" + id);
//       setPin(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   async function updatePin(id, title, pin, setEdit) {
//     try {
//       const { data } = await axios.put("http://localhost:8000/api/pin/" + id, {
//         title,
//         pin,
//       });
//       toast.success(data.message);
//       fetchPin(id);
//       setEdit(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function addComment(id, comment, setComment) {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/api/pin/comment/" + id,
//         { comment }
//       );
//       toast.success(data.message);
//       fetchPin(id);
//       setComment("");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function deleteComment(id, commentId) {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:8000/api/pin/comment/${id}?commentId=${commentId}`
//       );
//       toast.success(data.message);
//       fetchPin(id);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function deletePin(id, navigate) {
//     setLoading(true);
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:8000/api/pin/${id}`
//       );
//       toast.success(data.message);
//       navigate("/");
//       setLoading(false);
//       fetchPins();
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoading(false);
//     }
//   }

//   async function addPin(
//     formData,
//     setFilePrev,
//     setFile,
//     setTitle,
//     setPin,
//     navigate
//   ) {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/api/pin/new",
//         formData
//       );

//       toast.success(data.message);
//       setFile([]);
//       setFilePrev("");
//       setPin("");
//       setTitle("");
//       fetchPins();
//       navigate("/");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   useEffect(() => {
//     fetchPins();
//   }, []);

//   return (
//     <PinContext.Provider
//       value={{
//         pins,
//         loading,
//         fetchPin,
//         pin,
//         updatePin,
//         addComment,
//         deleteComment,
//         deletePin,
//         addPin,
//         fetchPins,
//       }}
//     >
//       {children}
//     </PinContext.Provider>
//   );
// };

// export const PinData = () => useContext(PinContext);

import axios from "../axiosConfig";
import { useContext, useEffect, useState, createContext } from "react";
import toast from "react-hot-toast";

const PinContext = createContext();

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState([]);

  // Function to fetch all pins
  async function fetchPins() {
    const cachedPins = localStorage.getItem("pins");
    if (cachedPins) {
      setPins(JSON.parse(cachedPins));
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${apiUrl}/pin/all`);
      localStorage.setItem("pins", JSON.stringify(data)); // Cache pins data
      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Function to fetch a single pin by ID
  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/pin/${id}`);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Function to update a pin by ID
  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put(`${apiUrl}/pin/${id}`, {
        title,
        pin,
      });
      toast.success(data.message);
      fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Function to add a comment to a pin
  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post(`${apiUrl}/pin/comment/${id}`, {
        comment,
      });
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Function to delete a comment from a pin
  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `${apiUrl}/pin/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Function to delete a pin by ID
  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${apiUrl}/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      localStorage.removeItem("pins"); // Clear cached data
      fetchPins(); // Refresh data from server
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // Function to add a new pin
  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post(`${apiUrl}/pin/new`, formData);
      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      localStorage.removeItem("pins"); // Clear cached data
      fetchPins(); // Refresh data from server
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        pin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
        fetchPins,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
