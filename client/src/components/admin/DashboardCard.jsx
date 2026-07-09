import React from "react";

const DashboardCard = ({
    title,
    value,
    icon,
    color,
}) => {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition">

            <div>

                <p className="text-gray-500 text-sm">

                    {title}

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {value}

                </h2>

            </div>

            <div
                className={`text-5xl ${color}`}
            >
                {icon}
            </div>

        </div>

    );

};

export default DashboardCard;