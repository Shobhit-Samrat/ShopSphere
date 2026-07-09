import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {

    fetchProfile,

} from "../../features/auth/authThunk";

import {

    logout,

} from "../../features/auth/authSlice";

const Profile = () => {

    const dispatch = useDispatch();

    const {

        user,

        loading,

    } = useSelector(

        (state) => state.auth

    );

    useEffect(() => {

        dispatch(fetchProfile());

    }, [dispatch]);

        const logoutHandler = () => {

        dispatch(logout());

    };

    if (loading) {

        return (

            <h2 className="text-center text-3xl mt-20">

                Loading...

            </h2>

        );

    }

    if (!user) {

        return null;

    }

       return (

    <div className="max-w-6xl mx-auto py-10 px-5">

        <h1 className="text-4xl font-bold mb-10">

            My Profile

        </h1>

        <div className="grid md:grid-cols-3 gap-8">

            {/* Left Card */}

            <div className="bg-white rounded-xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <img
                        src={
                            user.avatar ||
                            "https://i.pravatar.cc/300"
                        }
                        alt={user.name}
                        className="w-36 h-36 rounded-full object-cover"
                    />

                    <h2 className="text-2xl font-bold mt-5">

                        {user.name}

                    </h2>

                    <p className="text-gray-500">

                        {user.email}

                    </p>

                    <span className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                        {user.role}

                    </span>

                </div>

            </div>

            {/* Right Card */}

            <div className="md:col-span-2">

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        Account

                    </h2>

                    <div className="space-y-5">

                        <Link
                            to="/profile/edit"
                            className="block bg-blue-600 text-white py-3 px-6 rounded-lg"
                        >
                            Edit Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className="block bg-green-600 text-white py-3 px-6 rounded-lg"
                        >
                            Change Password
                        </Link>

                        <Link
                            to="/my-orders"
                            className="block bg-yellow-500 text-white py-3 px-6 rounded-lg"
                        >
                            My Orders
                        </Link>

                        <button
                            onClick={logoutHandler}
                            className="w-full bg-red-600 text-white py-3 rounded-lg"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

);

};

export default Profile;