import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserDetails from "../Components/Profile/UserDetails";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="bg-[#f2f0f7] ">
      <div className="w-11/12 max-w-[1200px] mx-auto py-4 ">
        <UserDetails />

        {user.accountType === "Owner" && (
          <div className="w-full flex justify-center gap-4 mt-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-indigo-800 rounded-md text-white transition-all duration-200 hover:scale-95"
            >
              List Property
            </button>

            <button
              onClick={() => navigate("/listings")}
              className="px-4 py-2 bg-indigo-800 rounded-md text-white transition-all duration-200 hover:scale-95"
            >
              View Listings
            </button>
          </div>
        )}
        {user.accountType === "Student" && (
          <div className="w-full flex justify-center gap-4 mt-4 mb-8">
            <button
              onClick={() => navigate("/user/bookings")}
              className="px-4 py-2 bg-indigo-800 rounded-md text-white transition-all duration-200 hover:scale-95"
            >
              View Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
