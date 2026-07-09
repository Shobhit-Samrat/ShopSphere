import OrderRow from "./OrderRow";

const OrderTable = ({ orders }) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="p-4">

                            Order ID

                        </th>

                        <th>

                            Customer

                        </th>

                        <th>

                            Total

                        </th>

                        <th>

                            Payment

                        </th>

                        <th>

                            Status

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order => (

                            <OrderRow

                                key={order._id}

                                order={order}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default OrderTable;