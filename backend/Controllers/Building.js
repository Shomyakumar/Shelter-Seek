

const Building = require("../Models/Building");
const User = require("../Models/User");
const uploadImageToCloudinary = require('../Utils/imageUploader');
require("dotenv").config();

exports.createBuilding = async (req, res) => {
    try {
            const userId = req.user.id;
            
            // Destructure and validate incoming request body
            const { name, address, accommodationType, beds, washroomType, price, totalRooms, vacantRooms } = req.body;
            
            console.log("request body is",req.body);
            // Validate required fields
            if (!name || !address || !accommodationType || !beds || !washroomType || !price || !totalRooms || !vacantRooms) {
            return res.status(400).json({
                success: false,
                message: "All details are required.",
            });
        }
        console.log("req files",req.files);

        // Validate thumbnail image
        if (!req.files || !req.files?.thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail image is required.",
            });
        }

        const thumbnail = req.files.thumbnail;

        // Validate owner exists
        const owner = await User.findById(userId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Owner details not found",
            });
        }

        // Upload thumbnail image to Cloudinary
        let uploadedImage;
        try {
                uploadedImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            }
            catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Error uploading image to Cloudinary",
                error: uploadError.message,
            });
            }

        // Create the building
        const building = await Building.create({
        name,
        address,
        accommodationType,
        beds,
        washroomType,
        price,
        totalRooms,
        vacantRooms,
        thumbnail: uploadedImage.secure_url,  // Save Cloudinary image URL
        owner: userId,
        });

        res.status(200).json({
        success: true,
        message: "Building created successfully",
        data: building,
        });

    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Error in creating building",
        error: error.message,
        });
    }
};


exports.uploadPhotos = async (req, res) => {
    try {
        // Extract the building ID from the request body
        const { houseId } = req.body;

        // Validate that a building ID was provided
        if (!houseId) {
            return res.status(400).json({
                success: false,
                message: "Building ID is required.",
            });
        }

        // Validate that photos are included in the request
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one photo is required.",
            });
        }

        // Find the building by ID
        const building = await Building.findById(houseId);
        if (!building) {
            return res.status(404).json({
                success: false,
                message: "Building not found.",
            });
        }

        // Initialize an array to store Cloudinary image URLs
        let imageUrls = [];
        
        console.log("photos are",req.files.photos);
        // Upload each photo to Cloudinary and get the URL
        for (let i = 0; i < req.files.photos.length; i++) {
            const photo = req.files.photos[i];
            let uploadedImage;
            try {
                uploadedImage = await uploadImageToCloudinary(photo, process.env.FOLDER_NAME);
                imageUrls.push(uploadedImage.secure_url);
            } catch (uploadError) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image to Cloudinary.",
                    error: uploadError.message,
                });
            }
        }

        // Update the building's images array with the new URLs
        building.images = [...building.images, ...imageUrls];
        await building.save();

        // Respond with success and the updated building details
        res.status(200).json({
            success: true,
            message: "Photos uploaded successfully.",
            data: building,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading photos.",
            error: error.message,
        });
    }
};



exports.fetchUserBuildings = async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        const userId = req.user.id;

        // Fetch buildings associated with the user
        const buildings = await Building.find({ owner: userId });

        // Check if buildings exist
        if (!buildings || buildings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No buildings found for this user.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Buildings retrieved successfully.",
            data: buildings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving buildings.",
            error: error.message,
        });
    }
};

exports.getAllBuildings = async (req, res) => {
    try {
        // Perform a single query to fetch all buildings
        const buildings = await Building.find();

        // Group buildings based on bed type
        const singleBedBuildings = buildings.filter(building => building.beds === "Single");
        const doubleBedBuildings = buildings.filter(building => building.beds === "Double");
        const singleAndDoubleBuildings = buildings.filter(building => building.beds === "Single and Double");

        res.status(200).json({
            success: true,
            message: "Buildings data fetched successfully",
            data: {
                single: singleBedBuildings,
                double: doubleBedBuildings,
                both: singleAndDoubleBuildings,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching buildings.",
            error: error.message,
        });
    }
};



// Controller for fetching building details by ID
exports.getBuildingDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find building by ID
    const building = await Building.findById(id);
    
    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found',
      });
    }

    // Return building details
    res.status(200).json({
      success: true,
      message: 'Building details fetched successfully',
      data: building,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching building details',
      error: error.message,
    });
  }
};

exports.updateBuildingDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalRooms, vacantRooms, price,address } = req.body;

        // Validate input
        if (vacantRooms > totalRooms) {
            return res.status(400).json({
                success: false,
                message: "Vacant rooms cannot exceed total rooms.",
            });
        }

        // Find and update building
        const building = await Building.findByIdAndUpdate(
            id,
            { totalRooms, vacantRooms, price,address },
            { new: true} // Return updated document
        );

        if (!building) {
            return res.status(404).json({
                success: false,
                message: "Building not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Building updated successfully.",
            data: building,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating building details.",
            error: error.message,
        });
    }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("house id is",id);

    // Find building by ID
    const building = await Building.findById(id);
    
    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found',
      });
    }

    const response=await Building.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Building deleted successfully',
      data: response,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting building',
      error: error.message,
    });
  }
};


exports.getBookedUsers = async (req, res) => {
    const buildingId = req.params.id;

    try {
        // Find the building and populate bookedUsers
        const building = await Building.findById(buildingId).populate("bookedUsers", "firstName lastName email image");

        if (!building) {
            return res.status(404).json({
                success: false,
                message: "Building not found",
            });
        }

        return res.status(200).json({
            success: true,
            bookedUsers: building.bookedUsers,
        });
    } catch (error) {
        console.error("Error fetching booked users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
