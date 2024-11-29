import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function Bookings() {
    const { id: buildingId } = useParams(); // Get building ID from the route
    const { token } = useSelector((state) => state.auth); // Retrieve token from Redux
    const [bookedUsers, setBookedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch booked users for the building
        async function fetchBookedUsers() {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/building/bookedUsers/${buildingId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setBookedUsers(response.data.bookedUsers);
                } else {
                    toast.error(response.data.message || "Failed to fetch booked users.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching booked users.");
                console.error("Error fetching booked users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookedUsers();
    }, [buildingId, token]);

    if (loading) return <div>Loading booked users...</div>;

    return (
        <div className="bg-[#f2f0f7]">
            <div className="w-11/12 max-w-[1200px] mx-auto py-4 min-h-[80vh] ">

                    <div className="rounded-md bg-gradient-to-b from-indigo-200 to-indigo-400 p-4 md:p-8 my-6">
                        <h2 className="mb-8 text-4xl font-semibold text-center">Booked Users</h2>
                        {bookedUsers.length === 0 ? (
                            <p className="text-center text-gray-500">No users have booked this building yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {bookedUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        className="bg-indigo-100 shadow-md rounded-lg flex flex-col md:flex-row items-center p-6"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={user.image || "https://via.placeholder.com/150"}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-24 h-24 object-cover rounded-full"
                                            />
                                        </div>
                                        <div className="flex-grow ml-4">
                                            <h3 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h3>
                                            <p className="text-gray-600">{user.email}</p>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

    );
}
