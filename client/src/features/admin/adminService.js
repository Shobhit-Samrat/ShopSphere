import API from "../../services/api";

// ======================================
// Dashboard Statistics
// ======================================

const getDashboardStats = async () => {

    const response = await API.get("/admin/dashboard");

    return response.data;

};

// ======================================
// Get All Orders (Admin)
// ======================================

const getAllOrders = async () => {

    const response = await API.get("/orders");

    return response.data;

};

// ======================================
// Update Order Status (Admin)
// ======================================

const updateOrderStatus = async ({
    id,
    orderStatus,
}) => {

    const response = await API.put(

        `/orders/${id}`,

        {
            orderStatus,
        }

    );

    return response.data;

};

const adminService = {

    getDashboardStats,

    getAllOrders,

    updateOrderStatus,

};

export default adminService;