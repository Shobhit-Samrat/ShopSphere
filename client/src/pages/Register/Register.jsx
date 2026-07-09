import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { registerUser } from "../../features/auth/authThunk";

const Register = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

    });

    const { name, email, password } = formData;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await dispatch(
            registerUser(formData)
        );

        if (registerUser.fulfilled.match(result)) {

            toast.success(
                result.payload.message || "Registration Successful"
            );

            navigate("/login");

        } else {

            toast.error(
                result.payload || "Registration Failed"
            );

        }

    };

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Create Account

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg disabled:bg-gray-400"
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }

                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;