import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardStats } from "../../features/admin/adminThunk";

import DashboardCard from "../../components/admin/DashboardCard";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
    FaBox,
    FaUsers,
    FaShoppingBag,
    FaRupeeSign,
    FaExclamationTriangle,
    FaClock,
} from "react-icons/fa";

const Dashboard = () => {

    const dispatch = useDispatch();

    const {
        stats,
        loading,
    } = useSelector(
        state => state.admin
    );

    useEffect(() => {

        dispatch(fetchDashboardStats());

    }, [dispatch]);

    if (loading || !stats) {

        return (

            <div className="text-center py-20">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Admin Dashboard

                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <DashboardCard
                        title="Products"
                        value={stats.totalProducts}
                        icon={<FaBox />}
                        color="text-blue-600"
                    />

                    <DashboardCard
                        title="Users"
                        value={stats.totalUsers}
                        icon={<FaUsers />}
                        color="text-green-600"
                    />

                    <DashboardCard
                        title="Orders"
                        value={stats.totalOrders}
                        icon={<FaShoppingBag />}
                        color="text-orange-600"
                    />

                    <DashboardCard
                        title="Revenue"
                        value={`₹${stats.totalRevenue.toFixed(2)}`}
                        icon={<FaRupeeSign />}
                        color="text-purple-600"
                    />

                    <DashboardCard
                        title="Pending Orders"
                        value={stats.pendingOrders}
                        icon={<FaClock />}
                        color="text-yellow-600"
                    />

                    <DashboardCard
                        title="Low Stock"
                        value={stats.lowStockProducts}
                        icon={<FaExclamationTriangle />}
                        color="text-red-600"
                    />

                </div>

            </div>

        </div>

    );

};

export default Dashboard;