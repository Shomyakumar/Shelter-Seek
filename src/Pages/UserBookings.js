import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const DEFAULT_BUILDING_IMAGE = "https://via.placeholder.com/300";

export default function UserBookings() {
    const { token } = useSelector((state) => state.auth); // Retrieve token from Redux
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user bookings
        async function fetchBookings() {
            try {
                const response = await axios.post("http://localhost:4000/api/v1/auth/userBookings",{token}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("response is .....",response);
                if (response) {
                    setBookings(response.data.bookings);
                } else {
                    toast.error(response.data.message || "Failed to fetch bookings.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching bookings.");
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f0f7]">
            <div className="w-11/12 max-w-[1200px] mx-auto py-4 min-h-[80vh]">
                <div className="rounded-md bg-gradient-to-b from-indigo-200 to-indigo-400 p-4 md:p-8 my-6">
                    <h2 className="mb-8 text-4xl font-semibold text-center">My Bookings</h2>
                    {bookings.length === 0 ? (
                        <p className="text-center text-gray-500">You have not booked any properties yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking,index) => (
                                <div
                                    key={index}
                                    className="bg-teal-100 shadow-md rounded-lg flex flex-col md:flex-row items-center p-6"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={booking.thumbnail || DEFAULT_BUILDING_IMAGE}
                                            alt={booking.name}
                                            className="w-48 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-grow ml-4">
                                        <h3 className="text-xl font-bold">{booking.name}</h3>
                                        <p className="text-gray-600">{booking.location}</p>
                                        <p className="text-indigo-500 font-semibold">{`Price: ₹${booking.price}`}</p>
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
