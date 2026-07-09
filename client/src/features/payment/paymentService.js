import API from "../../services/api";

// ======================================
// Get Razorpay Public Key
// ======================================

const getRazorpayKey = async () => {

    const response = await API.get("/payment/key");

    return response.data;

};

// ======================================
// Create Razorpay Order
// ======================================

const createRazorpayOrder = async (

    amount,

    orderId

) => {

    const response = await API.post(

        "/payment/create-order",

        {

            amount,

            orderId,

        }

    );

    return response.data;

};

// ======================================
// Verify Razorpay Payment
// ======================================

const verifyPayment = async (paymentData) => {

    const response = await API.post(

        "/payment/verify",

        paymentData

    );

    return response.data;

};

const paymentService = {

    getRazorpayKey,

    createRazorpayOrder,

    verifyPayment,

};

export default paymentService;