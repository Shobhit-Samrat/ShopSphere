import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../../features/order/orderSlice";

const ShippingSchema = Yup.object({

    fullName: Yup.string()
        .required("Full Name is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone Number is required"),

    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

    address: Yup.string()
        .required("Address is required"),

    city: Yup.string()
        .required("City is required"),

    state: Yup.string()
        .required("State is required"),

    country: Yup.string()
        .required("Country is required"),

    pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),

});

const ShippingForm = () => {

    const { user } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">

                Shipping Address

            </h2>

            <Formik

                initialValues={{

                    fullName: user?.name || "",

                    phone: "",

                    email: user?.email || "",

                    address: "",

                    city: "",

                    state: "",

                    country: "India",

                    pincode: "",

                }}

                validationSchema={ShippingSchema}

                onSubmit={(values) => {

                     dispatch(
                     saveShippingAddress(values)
                        );

                    navigate("/payment");

                }}
            >

                {() => (

                    <Form className="space-y-5">

                        <div>

                            <label>Full Name</label>

                            <Field

                                name="fullName"

                                className="w-full border rounded-lg p-3 mt-1"

                            />

                            <ErrorMessage

                                name="fullName"

                                component="div"

                                className="text-red-500 text-sm"

                            />

                        </div>

                        <div>

                            <label>Phone Number</label>

                            <Field

                                name="phone"

                                className="w-full border rounded-lg p-3 mt-1"

                            />

                            <ErrorMessage

                                name="phone"

                                component="div"

                                className="text-red-500 text-sm"

                            />

                        </div>

                        <div>

                            <label>Email</label>

                            <Field

                                name="email"

                                type="email"

                                className="w-full border rounded-lg p-3 mt-1"

                            />

                            <ErrorMessage

                                name="email"

                                component="div"

                                className="text-red-500 text-sm"

                            />

                        </div>

                        <div>

                            <label>Address</label>

                            <Field

                                as="textarea"

                                rows="3"

                                name="address"

                                className="w-full border rounded-lg p-3 mt-1"

                            />

                            <ErrorMessage

                                name="address"

                                component="div"

                                className="text-red-500 text-sm"

                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label>City</label>

                                <Field

                                    name="city"

                                    className="w-full border rounded-lg p-3 mt-1"

                                />

                                <ErrorMessage

                                    name="city"

                                    component="div"

                                    className="text-red-500 text-sm"

                                />

                            </div>

                            <div>

                                <label>State</label>

                                <Field

                                    name="state"

                                    className="w-full border rounded-lg p-3 mt-1"

                                />

                                <ErrorMessage

                                    name="state"

                                    component="div"

                                    className="text-red-500 text-sm"

                                />

                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label>Country</label>

                                <Field

                                    name="country"

                                    className="w-full border rounded-lg p-3 mt-1"

                                />

                                <ErrorMessage

                                    name="country"

                                    component="div"

                                    className="text-red-500 text-sm"

                                />

                            </div>

                            <div>

                                <label>Pincode</label>

                                <Field

                                    name="pincode"

                                    className="w-full border rounded-lg p-3 mt-1"

                                />

                                <ErrorMessage

                                    name="pincode"

                                    component="div"

                                    className="text-red-500 text-sm"

                                />

                            </div>

                        </div>

                        <button

                            type="submit"

                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

                        >

                            Continue to Payment

                        </button>

                    </Form>

                )}

            </Formik>

        </div>

    );

};

export default ShippingForm;