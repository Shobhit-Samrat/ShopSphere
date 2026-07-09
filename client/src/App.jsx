import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


import { fetchCart } from "./features/cart/cartThunk";
import { fetchWishlist } from "./features/wishlist/wishlistThunk";

import { fetchProfile } from "./features/auth/authThunk";


function App() {


    const dispatch = useDispatch();


    const {
        user,
        token
    } = useSelector(
        (state)=>state.auth
    );



    // Restore user after refresh
    useEffect(()=>{

        if(token && !user){

            dispatch(fetchProfile());

        }

    },[
        token,
        user,
        dispatch
    ]);




    // Load cart and wishlist
    useEffect(()=>{

        if(user){

            dispatch(fetchCart());

            dispatch(fetchWishlist());

        }

    },[
        user,
        dispatch
    ]);



    return (

        <>

            <Navbar/>


            <main className="min-h-screen">

                <AppRoutes/>

            </main>


            <Footer/>


        </>

    );


}


export default App;