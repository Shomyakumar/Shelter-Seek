


import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import {setUser} from "../redux/slices/profileSlice"
import {toast} from "react-hot-toast";
import UserDetails from "../Components/Profile/UserDetails";
import UserProperties from "../Components/Profile/UserProperties";

export default function Profile(){

    const navigate=useNavigate();
    const dispatch=useDispatch();
   
    const {user}=useSelector((state)=>state.profile);

   
   
    return (
        <div className="bg-[#f2f0f7] ">
            <div className="w-11/12 max-w-[1200px] mx-auto py-4 ">
                <UserDetails/>
                {
                    user.accountType==="Owner" && <UserProperties/>
                }
                {
                    user.accountType==="Owner" &&
                    <div className="w-full flex justify-center mt-4 mb-8">
                        <button onClick={()=>navigate('/register')}
                        className="px-4 py-2 bg-indigo-800 rounded-md text-white transition-all duration-200 hover:scale-95"
                        >List Property</button>
                    </div>
                }
            </div>
        </div>
    )
}