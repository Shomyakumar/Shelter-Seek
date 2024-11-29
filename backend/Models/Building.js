

const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    accommodationType: {
        type: String,
        required: true,
        enum: ['Apartment', 'Hostel',  'Independent Room'], // Example values
    },
    beds:{
        type:String,
        required:true,
        enum:['Single','Double','Single and Double'],
    },
    washroomType: {
        type: String,
        required: true,
        enum: ['Shared', 'Private'],
    },
    thumbnail:{
        type:String,
        required:true,
        trim:true,
    },
    images:[{
        type:String,
        trim:true,
    }],
    price: {
        type: Number,
        required: true,
        min: 0,  // Price can't be negative
    },
    totalRooms: {
        type: Number,
        required: true,
        min: 1,  // There must be at least one room
    },
    vacantRooms: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v <= this.totalRooms;  // vacantRooms can't exceed totalRooms
            },
            message: 'Vacant rooms cannot exceed total rooms'
        },
        min: 0,  // No negative values for rooms
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model for property owners
        required: true,
    },
    bookedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model for property owners
        
    }]
 

}, {
    timestamps: true  // Automatically adds createdAt and updatedAt
});

// Ensure that the coordinates are indexed for geo-queries
// buildingSchema.index({ geoLocation: '2dsphere' });

module.exports = mongoose.model('Building', buildingSchema);


