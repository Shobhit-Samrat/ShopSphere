import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchUsers,
    updateUserRole,
    removeUser,
} from "../../features/user/userThunk";

const Users = () => {

    const dispatch = useDispatch();

    const { users, loading } = useSelector(
        (state) => state.user
    );

    useEffect(() => {

        dispatch(fetchUsers());

    }, [dispatch]);

    const handleRoleChange = (id, role) => {

        dispatch(
            updateUserRole({
                id,
                role,
            })
        );

    };

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmDelete) {

            dispatch(removeUser(id));

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h1 className="text-2xl font-bold">

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                User Management

            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-slate-900 text-white">

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-center">
                                Role
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-100"
                                >

                                    <td className="p-4">

                                        {user.name}

                                    </td>

                                    <td className="p-4">

                                        {user.email}

                                    </td>

                                    <td className="p-4 text-center">

                                        <select

                                            value={user.role}

                                            onChange={(e) =>
                                                handleRoleChange(
                                                    user._id,
                                                    e.target.value
                                                )
                                            }

                                            className="border rounded px-3 py-2"

                                        >

                                            <option value="user">

                                                User

                                            </option>

                                            <option value="admin">

                                                Admin

                                            </option>

                                        </select>

                                    </td>

                                    <td className="p-4 text-center">

                                        <button

                                            onClick={() =>
                                                handleDelete(
                                                    user._id
                                                )
                                            }

                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Users;