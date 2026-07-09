import API from "../../services/api";

// ======================================
// Get All Users
// ======================================

const getUsers = async () => {

    const response = await API.get("/users");

    return response.data;

};

// ======================================
// Update User Role
// ======================================

const updateRole = async (id, role) => {

    const response = await API.put(

        `/users/${id}`,

        { role }

    );

    return response.data;

};

// ======================================
// Delete User
// ======================================

const deleteUser = async (id) => {

    const response = await API.delete(

        `/users/${id}`

    );

    return response.data;

};

export default {

    getUsers,

    updateRole,

    deleteUser,

};