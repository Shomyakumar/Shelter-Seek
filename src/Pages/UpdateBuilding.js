import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBuildingDetails = () => {
  const { id } = useParams(); // Building ID from URL
  console.log("id is",id);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Redux token
  const [formData, setFormData] = useState({
    totalRooms: "",
    vacantRooms: "",
    price: "",
    address:""
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing building details
  useEffect(() => {
    const fetchBuilding = async () => {
        try {
            const response = await axios.get(
            `http://localhost:4000/api/v1/building/getBuildingDetails/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            const { totalRooms, vacantRooms, price,address } = response.data.data;
            setFormData({ totalRooms, vacantRooms, price ,address});
        } 
        catch (error) {
            toast.error("Failed to fetch building details.");
            console.error(error);
        } 

        setLoading(false);
      
    };
    fetchBuilding();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(formData.vacantRooms) > parseInt(formData.totalRooms)) {
            toast.error("Vacant rooms cannot exceed total rooms.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/api/v1/building/updateBuilding/${id}`,
                formData,
                {
                headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Building details updated successfully!");
            navigate("/profile"); // Redirect after success
        }
        catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update building details."
            );
            console.error(error);
        }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-[#f2f0f7] py-10 flex items-center justify-center min-h-[75vh]">
      <div className="w-11/12 max-w-[600px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12">
        <h2 className="text-4xl mb-6 text-center font-semibold">
          Update Building Details
        </h2>
        <form onSubmit={handleSubmit} className="p-4 md:p-8">
          {/* Total Rooms Input */}
          <div className="mb-4">
            <label className="font-semibold text-lg mb-2" htmlFor="totalRooms">
              Total Rooms
            </label>
            <input
              type="number"
              name="totalRooms"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
              placeholder="Enter total rooms"
              value={formData.totalRooms}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Vacant Rooms Input */}
          <div className="mb-4">
            <label className="font-semibold text-lg mb-2" htmlFor="vacantRooms">
              Vacant Rooms
            </label>
            <input
              type="number"
              name="vacantRooms"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
              placeholder="Enter vacant rooms"
              value={formData.vacantRooms}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Room Price Input */}
          <div className="mb-4">
            <label className="font-semibold text-lg mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
              placeholder="Enter room price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-lg mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBuildingDetails;
