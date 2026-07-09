import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaBox,
    FaUsers,
    FaShoppingBag,
} from "react-icons/fa";

const AdminSidebar = () => {

    const location = useLocation();

    const menus = [

        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaHome />,
        },

        {
            name: "Products",
            path: "/admin/products",
            icon: <FaBox />,
        },

        {
            name: "Orders",
            path: "/admin/orders",
            icon: <FaShoppingBag />,
        },

        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUsers />,
        },

    ];

    return (

        <div className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">

            <h1 className="text-3xl font-bold text-center py-8 border-b border-slate-700">

                ShopSphere

            </h1>

            <nav className="mt-4">

                {

                    menus.map((menu) => {

                        const active =
                            location.pathname.startsWith(menu.path);

                        return (

                            <Link

                                key={menu.path}

                                to={menu.path}

                                className={`flex items-center gap-3 px-6 py-4 transition-all duration-200

                                ${
                                    active
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                }`}

                            >

                                <span className="text-lg">

                                    {menu.icon}

                                </span>

                                <span>

                                    {menu.name}

                                </span>

                            </Link>

                        );

                    })

                }

            </nav>

        </div>

    );

};

export default AdminSidebar;