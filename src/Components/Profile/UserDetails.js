
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import Modal from "../Common/Modal"

import {setToken} from "../../redux/slices/authSlice"
import {setUser} from "../../redux/slices/profileSlice"
import {toast} from "react-hot-toast";

export default function UserDetails(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [modalData,setModalData]=useState(null);
    const {user}=useSelector((state)=>state.profile);

    function logOutHandler(){
        console.log("logoutHandler called");
        
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
    return (
        <div>
             <div className="rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 p-4 md:p-8 ">

                <h2 className="text-4xl text-center mt-4 font-semibold">Profile Details</h2>
                <div className="flex flex-col md:flex-row gap-8 justify-center mb-4 mt-8 items-start">
                    <div className="min-h-[100px]  ">
                        <img className="min-h-[100px] max-h-[200px] object-cover rounded-md" src={user.image} alt="user-img"></img>

                        <button onClick={()=>{navigate("/profile/settings")}}
                            className="flex items-center gap-2 text-white px-2 py-1 hover:text-indigo-100"
                        >

                        <FiEdit/> Edit</button>
                    </div>
                    <div className="text-lg flex flex-col gap-2 font-semibold ">
                        <p>First name: <span>{user.firstName}</span></p>
                        <p>Last name: <span>{user.lastName}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                        <p>Account type: <span>{user.accountType}</span></p>
                        <div className="my-4">
                            <button className="px-3 py-1 bg-indigo-50 rounded-md  hover:bg-white"
                            onClick={()=>{
                                    setModalData({
                                        text1:"Are you sure ?",
                                        text2:"You will be logged out of your account",
                                        btn1Text:"Logout",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>{logOutHandler()},
                                        btn2Handler:()=>{setModalData(null)},
                                    })
                                }}
                            
                            >
                            Log out
                            </button>
                            
                        </div>
                    </div>
                </div>
                {
                    modalData&& <Modal modalData={modalData}></Modal>
                }

            </div>
        </div>
    )
}