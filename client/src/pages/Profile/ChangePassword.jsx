import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {

    changePassword,

} from "../../features/auth/authThunk";

const ChangePassword = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        loading,

    } = useSelector(

        (state) => state.auth

    );

    const [formData, setFormData] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

    });

const changeHandler = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value,

    });

};

const submitHandler = async (e) => {

    e.preventDefault();

    if (

        formData.newPassword !==

        formData.confirmPassword

    ) {

        toast.error(

            "Passwords do not match"

        );

        return;

    }

    const result = await dispatch(

        changePassword({

            currentPassword:

                formData.currentPassword,

            newPassword:

                formData.newPassword,

        })

    );

    if (

        changePassword.fulfilled.match(result)

    ) {

        toast.success(

            "Password Changed Successfully"

        );

        navigate("/profile");

    }

    else {

        toast.error(

            result.payload ||

            "Failed to change password"

        );

    }

};

return (

<div className="max-w-xl mx-auto py-10">

    <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">

            Change Password

        </h1>

        <form

            onSubmit={submitHandler}

            className="space-y-5"

        >

            <input

                type="password"

                name="currentPassword"

                placeholder="Current Password"

                value={formData.currentPassword}

                onChange={changeHandler}

                className="w-full border rounded-lg p-3"

                required

            />

            <input

                type="password"

                name="newPassword"

                placeholder="New Password"

                value={formData.newPassword}

                onChange={changeHandler}

                className="w-full border rounded-lg p-3"

                required

            />

            <input

                type="password"

                name="confirmPassword"

                placeholder="Confirm Password"

                value={formData.confirmPassword}

                onChange={changeHandler}

                className="w-full border rounded-lg p-3"

                required

            />

            <button

                disabled={loading}

                className="w-full bg-green-600 text-white py-3 rounded-lg"

            >

                {

                    loading

                        ?

                        "Updating..."

                        :

                        "Change Password"

                }

            </button>

        </form>

    </div>

</div>

);

};

export default ChangePassword;