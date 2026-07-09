import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { searchProducts } from "../../features/product/productThunk";

import SearchSuggestions from "./SearchSuggestions";

const SearchBar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const {

        searchResults,

        searchLoading,

    } = useSelector(

        (state) => state.product

    );

    useEffect(() => {

        if (!keyword.trim()) return;

        const timer = setTimeout(() => {

            dispatch(

                searchProducts(keyword)

            );

        }, 400);

        return () => clearTimeout(timer);

    }, [

        keyword,

        dispatch,

    ]);

    const submitHandler = (e) => {

        e.preventDefault();

        if (!keyword.trim()) return;

        navigate(

            `/search/${keyword}`

        );

    };

    return (

        <div className="relative w-full max-w-xl">

            <form
                onSubmit={submitHandler}
            >

                <input

                    type="text"

                    placeholder="Search Products..."

                    value={keyword}

                    onChange={(e) =>

                        setKeyword(e.target.value)

                    }

                    className="
                        w-full
                        border
                        rounded-full
                        px-5
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

            </form>

            {

                keyword &&

                (

                    <SearchSuggestions

                        keyword={keyword}

                        loading={searchLoading}

                        products={searchResults}

                        clearSearch={() =>

                            setKeyword("")

                        }

                    />

                )

            }

        </div>

    );

};

export default SearchBar;