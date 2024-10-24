import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {toast } from 'react-hot-toast';
import axios from 'axios';

export default function UploadPhotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const {houseId}=useSelector((state)=>state.house);
  const {token}=useSelector((state)=>state.auth);

  const handlePhotoChange = (e) => {
    const newPhoto = e.target.files[0];
    
    if (newPhoto) {
      const updatedPhotos = [...selectedPhotos, newPhoto];
      setSelectedPhotos(updatedPhotos);

      // Create preview URL
      const photoPreviewURL = URL.createObjectURL(newPhoto);
      setPhotoPreviews((prevPreviews) => [...prevPreviews, photoPreviewURL]);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPhotos.length === 0) {
      toast.error('Please select at least one photo.');
      return;
    }
  
    console.log("Submitted photos:", selectedPhotos);
    console.log("House ID:", houseId);
  
    const toastId = toast.loading("Uploading photos...");
  
    try {
      const formData = new FormData();
  
      // Append houseId to formData
      formData.append('houseId', houseId);
      formData.append('token', token);
  
      // Append each selected photo to formData
      selectedPhotos.forEach((photo, index) => {
        formData.append(`photos`, photo); // `photos` is the key, change if your backend expects something else
      });
  
      // Send formData to your backend API
      const response = await axios.post('http://localhost:4000/api/v1/building/uploadPhotos', formData);
  
        if (response.status === 200) {
          toast.dismiss(toastId);
          toast.success('Photos uploaded successfully!');
          console.log("Response data:", response.data);
    
          // Redirect to profile or another page
          navigate("/profile");
        }
    } 
    catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.error('Error:', error);
    }
  };
  
  const handleBack = () => {
    navigate("/register");
  };

  return (
    <div className="bg-[#f2f0f7] py-10 flex items-center justify-center min-h-[75vh]">
      <div className="w-11/12 max-w-[800px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12">
        <h2 className="text-4xl mb-6 text-center font-semibold">Upload Photos</h2>
        
        <div className="p-4 md:p-8">
          <div className="mb-4 flex flex-col items-center">
            <button
              type="button"
              onClick={handleAddPhotoClick}
              className="bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out mb-4"
            >
              Add Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Display selected photos and their previews */}
          {selectedPhotos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Selected Photos:</h3>
              <ul className="flex gap-4 flex-wrap">
                {selectedPhotos.map((photo, index) => (
                  <li key={index} className="text-sm mb-2">
                    <p>{photo.name}</p>
                    <img
                      src={photoPreviews[index]}
                      alt={`Preview ${index}`}
                      className="max-w-[200px] object-cover rounded-md mt-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
