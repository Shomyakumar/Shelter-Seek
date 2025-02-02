import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageSlider from "../Components/FindRoom/ImageSlider"; // ImageSlider component
import { bookRoom } from "../services/HandleBooking";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

export default function BuildingDetails() {
  const { id } = useParams();
  const [buildingDetails, setBuildingDetails] = useState(null);
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchBuildingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/building/getBuildingDetails/${id}`
        );
        setBuildingDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching building details:", error);
      }
    };
    fetchBuildingDetails();
  }, [id]);

  function handleBooking(){
      console.log("user is",user);
      bookRoom(token,id, user, navigate, dispatch)
  }

  if (!buildingDetails) return <p>Loading...</p>;

  return (
    <div className="bg-[#f2f0f7]">
      <div className=" max-w-[1200px] w-11/12 mx-auto  min-h-screen py-10 b">
        <div className="max-w-7xl mx-auto  rounded-xl shadow-xl overflow-hidden bg-indigo-50">
          <div className="flex flex-col  ">
            <div className="w-full">
              <img
                src={buildingDetails.thumbnail}
                alt={buildingDetails.name}
                className="w-full max-h-[90vh] object-cover rounded-t-lg shadow-lg"
              />
            </div>
            <div className="p-8 w-full    mt-8">
              <h2 className="text-4xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-200 pb-4">
                {buildingDetails.name}
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">
                    Address:{" "}
                  </span>
                  {buildingDetails.address}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">Price: </span>
                  ₹{buildingDetails.price}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">
                    Total Rooms:{" "}
                  </span>
                  {buildingDetails.totalRooms}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">
                    Vacant Rooms:{" "}
                  </span>
                  {buildingDetails.vacantRooms}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">
                    Accommodation Type:{" "}
                  </span>
                  {buildingDetails.accommodationType}
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-semibold text-indigo-700">
                    Washroom Type:{" "}
                  </span>
                  {buildingDetails.washroomType}
                </p>
              </div>
            </div>
          </div>

          {buildingDetails.images.length > 0 && (
            <div className="my-8 px-8">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                {" "}
                Photos
              </h3>
              <ImageSlider images={buildingDetails.images} />
            </div>
          )}
          {
            user?.accountType==="Student" &&
            <div className="my-6 flex flex-col justify-center items-center gap-6">
              <p className="text-center text-sm text-gray-600">Book room and get owner details</p>
              <button onClick={handleBooking} className="px-6 py-3 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700">Book Room</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
