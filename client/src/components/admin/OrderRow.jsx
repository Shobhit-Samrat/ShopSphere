import { useDispatch } from "react-redux";

import { changeOrderStatus } from "../../features/admin/adminThunk";

const OrderRow = ({ order }) => {

    const dispatch = useDispatch();

    const statusHandler = (e) => {

        dispatch(

            changeOrderStatus({

                id: order._id,

                orderStatus: e.target.value,

            })

        );

    };

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-4">

                {order._id.slice(-8)}

            </td>

            <td>

                {order.user?.name}

            </td>

            <td>

                ₹{order.totalPrice}

            </td>

            <td>

                {order.paymentStatus}

            </td>

            <td>

                <select

                    value={order.orderStatus}

                    onChange={statusHandler}

                    className="border rounded px-3 py-2"

                >

                    <option value="Pending">

                        Pending

                    </option>

                    <option value="Processing">

                        Processing

                    </option>

                    <option value="Shipped">

                        Shipped

                    </option>

                    <option value="Delivered">

                        Delivered

                    </option>

                </select>

            </td>

        </tr>

    );

};

export default OrderRow;