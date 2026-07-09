import API from "../../services/api";

// ======================================
// Register
// ======================================

const registerUser = async (userData) => {

    const response = await API.post(

        "/auth/register",

        userData

    );

    return response.data;

};

// ======================================
// Login
// ======================================

const loginUser = async (userData) => {

    const response = await API.post(

        "/auth/login",

        userData

    );

    return response.data;

};

// ======================================
// Get Profile
// ======================================

const getProfile = async () => {

    const response = await API.get(

        "/auth/profile"

    );

    return response.data;

};

// ======================================
// Update Profile
// ======================================

const updateProfile = async (userData) => {

    const response = await API.put(

        "/auth/profile",

        userData

    );

    return response.data;

};

// ======================================
// Change Password
// ======================================

const changePassword = async (passwordData) => {

    const response = await API.put(

        "/auth/change-password",

        passwordData

    );

    return response.data;

};

// ======================================
// Logout
// ======================================

const logout = () => {

    localStorage.removeItem("token");

};

// ======================================

const authService = {

    registerUser,

    loginUser,

    getProfile,

    updateProfile,

    changePassword,

    logout,

};

export default authService;