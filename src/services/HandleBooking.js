import { toast } from "react-hot-toast";

import axios from "axios";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
}

export async function bookRoom(token, buildingId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // Load the Razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        toast.success("sdk loaded")

        // Initiate the order
        const orderResponse = await axios.post(
            "http://localhost:4000/api/v1/payment/capturePayment",
            { buildingId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.data);
        }

        // Razorpay options
        const options = {
            key: process.env.RAZORPAY_KEY, // Use environment variable for the key
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "Shelter Seek",
            description: "Thank you for booking a room with Shelter Seek",
            
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // Send successful payment email
                //sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                // Verify payment on the backend
                verifyPayment({ ...response, buildingId }, token, navigate, dispatch);
            },
        };

        // Open Razorpay payment UI
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        // Handle payment failure
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        });
    } catch (error) {
        console.log("PAYMENT API ERROR:", error);
        toast.error("Could not complete payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await axios.post(
            "http://localhost:4000/api/v1/payment/sendPaymentSuccessEmail", // Replace with the correct API endpoint
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR:", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/payment/verifyPayment",
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.data);
        }

        toast.success("Payment successful, room is booked!");
        navigate("/profile/bookings");
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR:", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
}
