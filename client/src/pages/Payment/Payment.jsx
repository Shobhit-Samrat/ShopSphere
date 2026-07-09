import { useSelector } from "react-redux";
import PaymentCard from "../../components/payment/PaymentCard";

const Payment = () => {

    const { cart } = useSelector(
        (state) => state.cart
    );

    const { shippingAddress } = useSelector(
        (state) => state.order
    );

    if (!cart) {

        return (

            <div className="max-w-5xl mx-auto py-20 text-center">

                <h1 className="text-4xl font-bold">

                    No Order Found

                </h1>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold mb-10">

                Payment

            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Shipping Address

                        </h2>

                        <div className="space-y-2">

                            <p>{shippingAddress?.fullName}</p>

                            <p>{shippingAddress?.phone}</p>

                            <p>{shippingAddress?.email}</p>

                            <p>{shippingAddress?.address}</p>

                            <p>

                                {shippingAddress?.city},

                                {" "}

                                {shippingAddress?.state}

                            </p>

                            <p>

                                {shippingAddress?.country}

                            </p>

                            <p>

                                {shippingAddress?.pincode}

                            </p>

                        </div>

                    </div>

                </div>

                <div>

                    <PaymentCard />

                </div>

            </div>

        </div>

    );

};

export default Payment;