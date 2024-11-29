const { instance } = require("../Config/Razorpay");
const Building = require("../Models/Building");
const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const paymentSuccessEmail = require("../mail/paymentSuccess");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// Capture Payment
exports.capturePayment = async (req, res) => {
    const { buildingId } = req.body;
    console.log("building id is",buildingId);

    const userId = req.user.id;

    // Validate input
    if (!buildingId) {
      return res.status(400).json({ success: false, message: "Please provide building details" });
    }

    let buildingDetails;
    try{
        buildingDetails=await Building.findById(buildingId);
        if(!buildingDetails)
        {
            return res.status(400).json({
              success:false,
              message:"Could not find building",
            })
        }
    }
    catch(error)
    {
       return res.status(400).json({
        success:false,
        message:error.message,
       })
    }
    // Calculate total amount 
    let total_amount = 50;

    // Razorpay order options
    const options = {
      amount: total_amount * 100, // amount in paise
      currency: "INR",
      receipt: uuidv4(), // unique receipt ID
    };

    try {
      // Create Razorpay order
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      res.status(200).json({
        success: true,
        data: paymentResponse,
      });
    } 
      catch (error) {
      console.error("Error initiating Razorpay order:", error);
      res.status(500).json({ success: false, message: "Could not initiate order" });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {

  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const buildingId = req.body?.buildingId;

  const userId = req.user.id

  // Validate input
  if (!razorpay_order_id ||
     !razorpay_payment_id ||
      !razorpay_signature || 
      !buildingId ||
       !userId)
        {
    return res.status(400).json({ success: false, message: "Payment verification failed due to missing data" });
  }

  // Generate signature for verification
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      // Book the user into the building
      await bookUser(buildingId, userId,razorpay_payment_id);

      // Send payment success email
      const bookedUser = await User.findById(userId);
      await mailSender(
        bookedUser.email,
        `Payment Successful - Booking Confirmed`,
        paymentSuccessEmail(
          `${bookedUser.firstName} ${bookedUser.lastName}`,
          50, // Total amount (dynamic if applicable)
          razorpay_order_id,
          razorpay_payment_id
        )
      );

      return res.status(200).json({ success: true, message: "Payment verified and booking confirmed" });
    } catch (error) {
      console.error("Error booking user or sending email:", error);
      return res.status(500).json({ success: false, message: "Internal server error during booking" });
    }
  }

  return res.status(400).json({ success: false, message: "Payment verification failed" });
};

// Book User into Building
const bookUser = async (buildingId, userId,paymentId) => {
  if (!buildingId || !userId) {
    throw new Error("Building ID and User ID are required for booking");
  }

  // Update Building with booked user
  const booking = await Building.findOneAndUpdate(
    { _id: buildingId },
    { $push: { bookedUsers: userId } },
    { new: true }
  );

  if (!booking) {
    throw new Error("Building not found");
  }

  console.log("Updated building:", booking);

  // Update User with building booking
  const bookedUser = await User.findByIdAndUpdate(
    userId,
    { 
      $push: { 
        bookings: buildingId,  // Add buildingId to the bookings array
        payments: paymentId,   // Add paymentId to the payments array
      } 
    },
    { new: true } // Return the updated document
  );
  

  if (!bookedUser) {
    throw new Error("User not found");
  }

  console.log("Booked user:", bookedUser);
};

