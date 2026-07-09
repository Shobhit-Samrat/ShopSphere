import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice";
import SearchBar from "../search/SearchBar";

import {
    FaShoppingCart,
    FaHeart,
    FaUser,
} from "react-icons/fa";

const Navbar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        isAuthenticated,
        user,
    } = useSelector((state) => state.auth);

    const { wishlist } = useSelector(
        (state) => state.wishlist
    );

    const { cart } = useSelector(
        (state) => state.cart
    );

    const logoutHandler = () => {

        dispatch(logout());

        navigate("/login");

    };

    return (

        <header className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    ShopSphere
                </Link>

                <div className="flex-1 mx-8">
                     <SearchBar />
                </div>

                <nav className="flex items-center gap-6">

                    <Link to="/">Home</Link>

                    {isAuthenticated && (
                        <Link to="/orders">
                            Orders
                        </Link>
                    )}

                    <Link
                        to="/wishlist"
                        className="relative"
                    >

                        <FaHeart size={22} />

                        {(wishlist?.length || 0) > 0 && (

                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">

                                {wishlist.length}

                            </span>

                        )}

                    </Link>

                    <Link
                        to="/cart"
                        className="relative"
                    >

                        <FaShoppingCart size={22} />

                        {(cart?.cartItems?.length || 0) > 0 && (

                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2">

                                {cart.cartItems.length}

                            </span>

                        )}

                    </Link>

                    {isAuthenticated ? (

                        <>

                            <Link
                                to="/profile"
                                className="flex items-center gap-2"
                            >

                                <FaUser />

                                {user?.name}

                            </Link>

                            {user?.role === "admin" && (

                                <Link
                                    to="/admin/dashboard"
                                    className="text-blue-600 font-semibold"
                                >
                                    Admin
                                </Link>

                            )}

                            <button
                                onClick={logoutHandler}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >

                            Login

                        </Link>

                    )}

                </nav>

            </div>

        </header>

    );

};



export default Navbar;