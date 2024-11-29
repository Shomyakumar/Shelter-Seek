

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';
import { MdDelete, MdUpdate } from "react-icons/md";
import { RiBookmark3Line } from "react-icons/ri";

export default function UserProperties  () {

    const { token } = useSelector((state) => state.auth); // Retrieve the token from Redux state
    const [buildings, setBuildings] = useState([]); // State to store buildings
    const [loading, setLoading] = useState(true); // Loading state
    const navigate=useNavigate();
    const [modalData,setModalData]=useState(null);

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
    useEffect(() => {

        fetchUserBuildings(); // Call the function
    }, [token]); // Re-run if token changes
    async function deleteListingHandler(id){
        const toastId=toast.loading("Deleting..");
        try{
                console.log("id is",id);
                const response = await axios.post('http://localhost:4000/api/v1/building/deleteBuilding', {id});
                
                if (response.status === 200) {
                    toast.success('deleted successfully!');

                }
                
        }
        catch(error){
            toast.error(error.response?.data?.message || 'Failed to delete listing'); // Show error message
            console.error('Error deleting listing:', error);
        }
        fetchUserBuildings();
        setModalData(null);
        toast.dismiss(toastId);
    }

    function updateHandler(id){
        navigate(`/update/${id}`)
    }

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
                            <div className='flex flex-col gap-4 items-center md:items-end justify-center pb-4 md:pb-0 md:flex-1 md:px-6'>
                                <button 
                                    className='flex gap-2 items-center px-3 py-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600'
                                    onClick={()=>{
                                        setModalData({
                                            text1:"Are you sure ?",
                                            text2:"Your Listing will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:()=>{deleteListingHandler(building._id)},
                                            btn2Handler:()=>{setModalData(null)},
                                        })
                                    }}
                                    > Delete <span><MdDelete/></span></button>
                                <button onClick={()=>{updateHandler(building._id)}}
                                    className='flex gap-2 items-center px-3 py-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600'
                                >
                                    Update <span><MdUpdate/></span>

                                </button>
                                <button onClick={()=>{navigate(`/building/bookings/${building._id}`)}}
                                    className='flex gap-2 items-center px-3 py-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600'
                                >
                                    Bookings <span><RiBookmark3Line /></span>

                                </button>
                            </div>
                        </div>
                    ))}
                    {
                    modalData&& <Modal modalData={modalData}></Modal>
                }
                </div>
            )}
        </div>
    );
};

