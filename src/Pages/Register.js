import { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import {toast} from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/profileSlice";
import { setHouseData,setHouseId } from "../redux/slices/houseSlice";
import axios from 'axios';

export default function Register() {

    const location = useLocation();
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const [houseDetails, setHouseDetails] = useState({
        name: "",
        accommodationType: "",
        beds:"",
        washroomType: "",
        price: "",
        totalRooms: "",
        vacantRooms:"",
        address: "",
        thumbnail:"",
        
    });
    const [file,setFile]=useState(null);

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setHouseDetails({
        ...houseDetails,
        [e.target.name]: e.target.value,
        });
    };
    function handleThumbnailChange(e) {
        const selectedThumbnail = e.target.files[0];
        if (selectedThumbnail) {
            setHouseDetails({ ...houseDetails, thumbnail: e.target.files[0] });
          setFile(URL.createObjectURL(selectedThumbnail));
          
        }
      }
      
    const handleNext = async(e) => {

        e.preventDefault();
        if (!houseDetails.name || !houseDetails.accommodationType ||!houseDetails.beds
          ||!houseDetails.washroomType || !houseDetails.price || !houseDetails.totalRooms
          ||!houseDetails.vacantRooms || !houseDetails.address || !houseDetails.thumbnail) {
          setError("Please fill all the fields.");
          return;
        }

        console.log(houseDetails);
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading...")
        try {
            
            const formData = new FormData();
            Object.keys(houseDetails).forEach(key => {
                formData.append(key, houseDetails[key]);
            });
        
            // formData.append("thumbnail", houseDetails.thumbnail); 
            formData.append("token", token);
            const response = await axios.post('http://localhost:4000/api/v1/building/createBuilding', formData);
            
            if (response.status === 200) {
                toast.success('House registered!');

                console.log("response data is",response.data.data,response.data.data._id); 
                dispatch(setHouseData(response.data.data));
                dispatch(setHouseId(response.data.data._id));
                
                           
                
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error('Error:', error);
        }
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        navigate("/register/upload-photos");
    };

  return (
    <div className="bg-[#f2f0f7] py-10 flex items-center justify-center ">
      <div className="w-11/12 max-w-[800px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to-indigo-400 py-12">
        <div>
          <h2 className="text-4xl mb-6 text-center font-semibold text-indigo-900">
            Enter House Details
          </h2>

          <form className="p-4 md:p-8">
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* House Name */}
            <div className="mb-4">
              <label htmlFor="name" className="font-semibold text-lg mb-2 block">
                House Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                placeholder="Enter house name"
                value={houseDetails.name}
                onChange={handleChange}
              />
            </div>

            {/* Accommodation Type */}
          
            <div className="mb-4">
                <label htmlFor="accommodationType" className="font-semibold text-lg mb-2 block">
                  Accommodation Type
                </label>
                <select
                  name="accommodationType"
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                  value={houseDetails.accommodationType }
                  onChange={handleChange}
                >
                  <option value="" disabled >Select accommodation type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Independent Room">Independent Room</option>
                </select>
              </div>

            {/* beds */}
            <div className="mb-4">
                <label htmlFor="beds" className="font-semibold text-lg mb-2 block">
                  No of beds in a room
                </label>
                <select
                  name="beds"
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                  value={houseDetails.beds}
                  onChange={handleChange}
                >
                  <option value="" disabled >Select no of beds</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Single and Double">Both single and double</option>
                </select>
              </div>
            {/* Washroom Type */}
            <div className="mb-4">
                <label htmlFor="WashroomType" className="font-semibold text-lg mb-2 block">
                  Washroom Type
                </label>
                <select
                  name="washroomType"
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                  value={houseDetails.washroomType}
                  onChange={handleChange}
                >
                  <option value="" disabled >Select washroom type</option>
                  <option value="Shared">Shared</option>
                  <option value="Private">Private</option>
                  
                </select>
              </div>
           

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="font-semibold text-lg mb-2 block">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                placeholder="Enter price"
                value={houseDetails.price}
                onChange={handleChange}
              />
            </div>

            {/* Total Rooms */}
            <div className="mb-4">
              <label htmlFor="totalRooms" className="font-semibold text-lg mb-2 block">
                Total Rooms
              </label>
              <input
                type="number"
                name="totalRooms"
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                placeholder="Enter total rooms"
                value={houseDetails.totalRooms}
                onChange={handleChange}
              />
            </div>
            {/* Vaccant Rooms */}
            <div className="mb-4">
              <label htmlFor="vacantRooms" className="font-semibold text-lg mb-2 block">
                Vacant Rooms
              </label>
              <input
                type="number"
                name="vacantRooms"
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                placeholder="Enter total rooms"
                value={houseDetails.vacantRooms}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="address" className="font-semibold text-lg mb-2 block">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                placeholder="Enter address"
                value={houseDetails.address}
                onChange={handleChange}
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-6 flex justify-center">
              
              <input
                type="file" name="tnumbnail" id="thumbnail"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              {file && (
                <img
                    src={file}
                    alt="selectedImage"
                    className="max-h-[150px] "
                />
                )}
                {!file && (
                    <div onClick={()=>document.getElementById("thumbnail").click()}
                        className=" w-full flex justify-center items-center gap-2 font-semibold p-6 rounded-sm bg-indigo-100">
                        <FiUploadCloud/> <span>Upload Thumbnail</span>
                    </div>
                )}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {setHouseDetails} from"../redux/slices/houseSlice"

// import { useState, useEffect } from 'react';

// export default function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
  
//   // Access house details from Redux
//   const { houseDetails } = useSelector((state) => state.house);
  
//   const [localHouseDetails, setLocalHouseDetails] = useState(houseDetails);

//   const handleChange = (e) => {
//     setLocalHouseDetails({
//       ...localHouseDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleThumbnailChange = (e) => {
//     setLocalHouseDetails({ ...localHouseDetails, thumbnail: e.target.thumbnails[0] });
//   };

//   const handleNext = () => {
//     dispatch(setHouseDetails(localHouseDetails));  // Save house details to Redux
//     navigate("/register/upload-photos");
//   };

//   useEffect(() => {
//     // When the component mounts, we initialize the local state from Redux
//     setLocalHouseDetails(houseDetails);
//   }, [houseDetails]);

//   return (
//     <div className="bg-[#f2f0f7] to-indigo-100 py-10 flex items-center justify-center min-h-[75vh]">
//       <div className="w-11/12 max-w-[600px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12">
//         <h2 className="text-4xl mb-6 text-center font-semibold">Enter House Details</h2>
//         <form className="p-4 md:p-8">
//             {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//             {/* House Name */}
//             <div className="mb-4">
//               <label htmlFor="name" className="font-semibold text-lg mb-2 block">
//                 House Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter house name"
//                 value={localHouseDetails.name} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Accommodation Type */}
//             <div className="mb-4">
//               <label htmlFor="accommodationType" className="font-semibold text-lg mb-2 block">
//                 Accommodation Type
//               </label>
//               <input
//                 type="text"
//                 name="accommodationType"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter accommodation type"
//                 value={localHouseDetails.accommodationType} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Washroom Type */}
//             <div className="mb-4">
//               <label htmlFor="washroomType" className="font-semibold text-lg mb-2 block">
//                 Washroom Type
//               </label>
//               <input
//                 type="text"
//                 name="washroomType"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter washroom type"
//                 value={localHouseDetails.washroomType} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label htmlFor="price" className="font-semibold text-lg mb-2 block">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter price"
//                 value={localHouseDetails.price} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Total Rooms */}
//             <div className="mb-4">
//               <label htmlFor="totalRooms" className="font-semibold text-lg mb-2 block">
//                 Total Rooms
//               </label>
//               <input
//                 type="number"
//                 name="totalRooms"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter total rooms"
//                 value={localHouseDetails.totalRooms} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Location */}
//             <div className="mb-4">
//               <label htmlFor="location" className="font-semibold text-lg mb-2 block">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//                 placeholder="Enter location"
//                 value={localHouseDetails.location} // Changed to localHouseDetails
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Thumbnail */}
//             <div className="mb-6">
//               <label className="font-semibold text-lg mb-2 block">Upload Thumbnail Image</label>
//               <input
//                 type="thumbnail"
//                 onChange={handleThumbnailChange}
//                 className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
//               />
//             </div>
          
//           <button type="button" onClick={handleNext}>
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
