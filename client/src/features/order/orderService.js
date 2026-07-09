import API from "../../services/api";

// ======================================
// Place Order
// ======================================

const placeOrder = async (orderData) => {

    const response = await API.post(

        "/orders",

        orderData

    );

    return response.data;

};

// ======================================
// Get My Orders
// ======================================

const getMyOrders = async () => {

    const response = await API.get(

        "/orders/myorders"

    );

    return response.data;

};

// ======================================
// Get Order By ID
// ======================================

const getOrderById = async (id) => {

    const response = await API.get(

        `/orders/${id}`

    );

    return response.data;

};

const orderService = {

    placeOrder,

    getMyOrders,

    getOrderById,

};

export default orderService;