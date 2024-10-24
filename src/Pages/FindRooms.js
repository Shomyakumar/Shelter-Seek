

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RenderBuilding from "../Components/FindRoom/RenderBuilding";

export default function FindRooms() {
  const [buildings, setBuildings] = useState({
    single: [],
    double: [],
    both: [],
  });
  const [selectedBedType, setSelectedBedType] = useState("single");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch buildings from the API
    const fetchBuildings = async () => {
      try {
            const response = await axios.get("http://localhost:4000/api/v1/building/getAllBuildings");
            if (response.status === 200) {
            setBuildings(response.data.data); // Set the buildings data
            console.log(response.data.data);
            toast.success("Buildings data fetched successfully");
            }
      } 
      catch (error) {
            toast.error("Error fetching buildings");
            console.error("Error:", error);
      } 

        setLoading(false);
      
    };

    fetchBuildings();
  }, []);

  const handleButtonClick = (bedType) => {
    setSelectedBedType(bedType);
  };

 
  return (
    <div className="bg-[#f2f0f7]">

        <div className="py-10 min-h-[70vh] mx-auto max-w-[1200px] w-11/12">
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => handleButtonClick("single")}
                    className={`px-4 py-2 rounded-md text-lg ${
                        selectedBedType === "single" ? "bg-indigo-800 text-white" : "bg-gray-300 "
                    }`}
                >
                Single Bed
                </button>
                <button
                    onClick={() => handleButtonClick("double")}
                    className={`px-4 py-2 rounded-md text-lg ${
                        selectedBedType === "double" ? "bg-indigo-800 text-white" : "bg-gray-300 "
                    }`}
                >
                Double Bed
                </button>
                <button
                    onClick={() => handleButtonClick("both")}
                    className={`px-4 py-2 rounded-md ${
                        selectedBedType === "both" ? "bg-indigo-800 text-white" : "bg-gray-300 "
                    }`}
                >
                Both
                </button>
            </div>
            <div>
                <RenderBuilding loading={loading} buildings={buildings} selectedBedType={selectedBedType}/>

            </div>
        </div>
    </div>
  );
}
