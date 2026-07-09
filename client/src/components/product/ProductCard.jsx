import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addCartItem } from "../../features/cart/cartThunk";

import {
    addWishlist,
    removeWishlist,
} from "../../features/wishlist/wishlistThunk";


import {
    FaStar,
    FaShoppingCart,
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";



const ProductCard = ({ product }) => {


    const dispatch = useDispatch();



    const {
        wishlist
    } = useSelector(
        (state)=>state.wishlist
    );


    const {
        isAuthenticated
    } = useSelector(
        (state)=>state.auth
    );




    const image =

        product.images &&
        product.images.length > 0

        ?

        product.images[0]

        :

        "https://via.placeholder.com/300";





    const isWishlisted =
        wishlist.some(
            item =>
            item._id === product._id
        );






    const wishlistHandler = (e)=>{

        e.preventDefault();


        if(!isAuthenticated){

            toast.error(
                "Please login first"
            );

            return;

        }



        if(isWishlisted){

            dispatch(
                removeWishlist(product._id)
            );


            toast.success(
                "Removed from wishlist"
            );


        }
        else{


            dispatch(
                addWishlist(product._id)
            );


            toast.success(
                "Added to wishlist"
            );

        }

    };







    const cartHandler = ()=>{


        if(!isAuthenticated){

            toast.error(
                "Please login first"
            );

            return;

        }



        if(product.stock===0){

            toast.error(
                "Product is out of stock"
            );

            return;

        }



        dispatch(

            addCartItem({

                productId:product._id,

                quantity:1

            })

        );



        toast.success(
            "Added to cart"
        );


    };






return (

<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">


    <Link to={`/product/${product._id}`}>



        <div className="relative">


            <img

            src={image}

            alt={product.name}

            className="
            w-full
            h-64
            object-cover
            group-hover:scale-105
            transition
            duration-300
            "

            />




            <button

            onClick={wishlistHandler}

            className="
            absolute
            top-3
            right-3
            bg-white
            rounded-full
            p-2
            shadow
            "

            >


                {

                isWishlisted

                ?

                <FaHeart
                className="text-red-500 text-xl"
                />

                :

                <FaRegHeart
                className="text-gray-600 text-xl"
                />

                }


            </button>



        </div>



    </Link>





<div className="p-5">


<p className="text-gray-500 text-sm">

{product.brand}

</p>




<Link to={`/product/${product._id}`}>

<h2 className="
font-semibold
text-lg
mt-2
hover:text-blue-600
">

{product.name}

</h2>


</Link>





<div className="
flex
items-center
gap-2
mt-3
">


<FaStar className="text-yellow-500"/>


<span>

{
product.rating
?
product.rating.toFixed(1)
:
"0.0"
}

</span>


<span className="text-gray-400">

({product.numReviews || 0})

</span>



</div>






<div className="
flex
justify-between
items-center
mt-5
">


<h3 className="
text-2xl
font-bold
text-blue-600
">

₹{product.price}

</h3>



{

product.stock>0

?

<span className="text-green-600 text-sm">

In Stock

</span>

:

<span className="text-red-600 text-sm">

Out of Stock

</span>


}



</div>







<button

onClick={cartHandler}

disabled={product.stock===0}


className={

`

mt-5
w-full
flex
justify-center
items-center
gap-2
py-3
rounded-lg
text-white

${

product.stock>0

?

"bg-blue-600 hover:bg-blue-700"

:

"bg-gray-400 cursor-not-allowed"

}

`

}


>


<FaShoppingCart/>


Add To Cart


</button>




</div>


</div>


);


};


export default ProductCard;