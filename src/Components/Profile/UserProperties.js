


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function UserProperties  () {

    const { token } = useSelector((state) => state.auth); // Retrieve the token from Redux state
    const [buildings, setBuildings] = useState([]); // State to store buildings
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUserBuildings = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/building/fetchUserBuildings ', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the header
                    },
                });
                setBuildings(response.data.data); // Set the buildings data
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch buildings'); // Show error message
                console.error('Error fetching buildings:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserBuildings(); // Call the function
    }, [token]); // Re-run if token changes

    if (loading) return <div>Loading...</div>; // Show loading state

    return (
        <div className='rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 p-4 md:p-8 my-6'>
            <h2 className='my-4 text-3xl font-semibold text-center'>Your Properties</h2>
            {buildings.length === 0 ? (
                <p className="text-center text-gray-500">No buildings found.</p>
            ) : (
                <div className="space-y-6">
                    {buildings.map((building) => (
                        <div className="bg-indigo-100 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row" key={building._id}>
                            <div className="md:w-1/3">
                                <img
                                    src={building.thumbnail}
                                    alt={building.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-2/3 p-6">
                                <h2 className="text-2xl font-bold mb-2">{building.name}</h2>
                                <p className="mb-1"><strong>Address:</strong> {building.address}</p>
                                <p className="mb-1"><strong>Accommodation Type:</strong> {building.accommodationType}</p>
                                <p className="mb-1"><strong>Beds:</strong> {building.beds}</p>
                                <p className="mb-1"><strong>Washroom Type:</strong> {building.washroomType}</p>
                                <p className="mb-1"><strong>Price:</strong> ₹ {building.price}</p>
                                <p className="mb-1"><strong>Total Rooms:</strong> {building.totalRooms}</p>
                                <p className="mb-1"><strong>Vacant Rooms:</strong> {building.vacantRooms}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


