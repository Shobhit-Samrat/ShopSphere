import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { loginUser } from "../../features/auth/authThunk";

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });

    const { email, password } = formData;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await dispatch(
            loginUser(formData)
        );

        if (loginUser.fulfilled.match(result)) {

            toast.success("Login Successful");

            navigate("/");

        } else {

            toast.error(
                result.payload || "Login Failed"
            );

        }

    };

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="w-full max-w-md shadow-lg rounded-xl p-8 bg-white">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Login

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:bg-gray-400"
                    >

                        {
                            loading
                                ? "Logging In..."
                                : "Login"
                        }

                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;