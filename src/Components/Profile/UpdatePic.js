

import { LuUpload } from "react-icons/lu";
import {useSelector,useDispatch} from 'react-redux';
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setLoading } from "../../redux/slices/profileSlice";
import {setUser}  from "../../redux/slices/profileSlice"

export default function UpdatePic(){

    

    const dispatch=useDispatch();
    const {user,loading}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    async function handleUpload () {

            if (!selectedFile) {
                toast.error("Please select a file first.");
                return;
            }
            const toastId = toast.loading("Loading...");
            dispatch(setLoading(true));
            try {
                    const formData = new FormData();
                    formData.append("profileImage", selectedFile);
                    formData.append("user", user); 
                    formData.append("token",token);

                    console.log("form data is",formData);
                    const response = await axios.post('http://localhost:4000/api/v1/profile/update-pic', formData);
                    console.log("UPDATE_PROFILE_PICTURE_API API RESPONSE............", response);
                    console.log(response.data);
                
                    if (!response.data.success) {
                        throw new Error(response.data.message);
                    }
                
                    toast.success("Profile updated Successfully");
                    dispatch(setUser(response.data.data))
                    // localStorage.setItem("user", JSON.stringify(response.data.user));
                    // toast.success("Login again to see updated picture.");
              
                } 
            catch (error)
                {
                    console.log("UPDATE_PROFILE_PICTURE_API ERROR............", error);
                    toast.error(error.message);
                }
            dispatch(setLoading(false));
            toast.dismiss(toastId);
       
    }



    return(
        <div className="w-11/12 max-w-[1200px] mx-auto py-4">
            
            <div className="flex gap-8 items-center  bg-gradient-to-b from-indigo-200 to bg-indigo-400  py-4 px-4 lg:px-6 lg:py-6 rounded-md  ">
                <img src={user?.image} alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[100px] rounded-full object-cover object-top '
                            />
                <div className="flex flex-col gap-4 ">
                    <p className="text-lg  font-bold">Change Profile  Picture</p>

                    <div className="flex flex-col md:flex-row gap-4 items-center ">

                        <label className="px-6 py-2 rounded-md text-lg transition-all duration-200 hover:scale-95 border border-indigo-600 bg-indigo-50 cursor-pointer">
                            Select File
                            <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            />
                        </label>
                    
                        <button className={`px-6 py-2 text-lg rounded-md bg-indigo-800 text-white  transition-all duration-200 hover:scale-95  `}
                            onClick={handleUpload}
                        >
                            <p className="flex items-center gap-2"><LuUpload />Upload <span>{
                                selectedFile&& 1
                            }</span></p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}