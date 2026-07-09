import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {

    updateProfile,

} from "../../features/auth/authThunk";

const EditProfile = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        user,

        loading,

    } = useSelector(

        (state) => state.auth

    );

    const [formData, setFormData] = useState({

        name: "",

        email: "",

    });

    useEffect(() => {

        if (user) {

            setFormData({

                name: user.name || "",

                email: user.email || "",

            });

        }

    }, [user]);

    const changeHandler = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const submitHandler = async (e) => {

        e.preventDefault();

        const result = await dispatch(

            updateProfile(formData)

        );

        if (updateProfile.fulfilled.match(result)) {

            toast.success(

                "Profile Updated Successfully"

            );

            navigate("/profile");

        }

        else {

            toast.error(

                result.payload ||

                "Update Failed"

            );

        }

    };

    if (loading) {

        return (

            <h2 className="text-center text-3xl mt-20">

                Loading...

            </h2>

        );

    }

    return (

        <div className="max-w-xl mx-auto py-10">

            <div className="bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Edit Profile

                </h1>

                <form

                    onSubmit={submitHandler}

                    className="space-y-5"

                >

                    <div>

                        <label className="font-medium">

                            Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={changeHandler}

                            className="w-full border rounded-lg p-3 mt-2"

                            required

                        />

                    </div>

                    <div>

                        <label className="font-medium">

                            Email

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={changeHandler}

                            className="w-full border rounded-lg p-3 mt-2"

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

                    >

                        Save Changes

                    </button>

                </form>

            </div>

        </div>

    );

};

export default EditProfile;