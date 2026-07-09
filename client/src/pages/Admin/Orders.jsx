import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/admin/AdminSidebar";
import OrderTable from "../../components/admin/OrderTable";

import {

    fetchAllOrders,

} from "../../features/admin/adminThunk";

const Orders = () => {

    const dispatch = useDispatch();

    const {

        orders,

        loading,

    } = useSelector(

        state => state.admin

    );

    useEffect(() => {

        dispatch(

            fetchAllOrders()

        );

    }, [dispatch]);

    return (

        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                <h1 className="text-4xl font-bold mb-8">

                    Orders

                </h1>

                {

                    loading

                        ?

                        <h2>

                            Loading...

                        </h2>

                        :

                        <OrderTable

                            orders={orders}

                        />

                }

            </div>

        </div>

    );

};

export default Orders;