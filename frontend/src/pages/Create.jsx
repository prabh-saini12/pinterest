// import React, { useRef, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { PinData } from "../context/PinContext";
// import { useNavigate } from "react-router-dom";

// const Create = () => {
//   const inputRef = useRef(null);

//   const handleClick = () => {
//     inputRef.current.click();
//   };

//   const [file, setFile] = useState("");
//   const [filePrev, setFilePrev] = useState("");
//   const [title, setTitle] = useState("");
//   const [pin, setPin] = useState("");
//   const { addPin } = PinData();

//   const changeFileHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setFilePrev(reader.result);
//       setFile(file);
//     };
//   };

//   const navigate = useNavigate();

//   const addPinHandler = (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("title", title);
//     formData.append("pin", pin);
//     formData.append("file", file);

//     addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
//   };
//   return (
//     <div>
//       <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
//         <div className="flex items-center justify-center">
//           <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg">
//             {filePrev && <img src={filePrev} alt="" />}
//             <div
//               className="flex flex-col items-center justify-center h-full cursor-pointer"
//               onClick={handleClick}
//             >
//               <input
//                 ref={inputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={changeFileHandler}
//               />
//               <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
//                 <FaPlus />
//               </div>
//               <p className="text-gray-500">Choose a file</p>
//             </div>
//             <p className="mt-4 text-sm text-gray-400">
//               we recomment using high quality .jpg files but less than 10mb
//             </p>
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-center bg-gray-100">
//             <form
//               className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
//               onSubmit={addPinHandler}
//             >
//               <div className="mb-4">
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   className="common-input"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="pin"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Pin
//                 </label>
//                 <input
//                   type="text"
//                   id="pin"
//                   className="common-input"
//                   value={pin}
//                   onChange={(e) => setPin(e.target.value)}
//                   required
//                 />
//               </div>
//               <button className="common-btn">Add+</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Create;

import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-5xl">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 md:p-6 w-full md:w-1/3">
          {filePrev && (
            <img
              src={filePrev}
              alt="Preview"
              className="w-full h-auto mb-4 rounded-lg"
              style={{ maxHeight: '200px' }} // Adjust the maximum height for the image
            />
          )}
          <div
            className="flex flex-col items-center justify-center h-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6"
            onClick={handleClick}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={changeFileHandler}
            />
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-200 rounded-full text-3xl">
              <FaPlus />
            </div>
            <p className="text-gray-500 text-lg">Choose a file</p>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            We recommend using high quality .jpg files but less than 10MB
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4 md:p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={addPinHandler}
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700"
              >
                Pin
              </label>
              <textarea
                id="pin"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
             className="common-btn"
            >
              Add+
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
