// import { useDispatch, useSelector } from "react-redux";

// import {
//     toggleTheme,
// } from "../../features/theme/themeSlice";

// import {
//     FaMoon,
//     FaSun,
// } from "react-icons/fa";

// const ThemeToggle = () => {

//     const dispatch = useDispatch();

//     const { theme } = useSelector(
//         (state) => state.theme
//     );

//     return (

//         <button
//             onClick={() => dispatch(toggleTheme())}
//             className="
//                 p-2
//                 rounded-full
//                 bg-gray-200
//                 dark:bg-gray-700
//                 transition
//             "
//         >

//             {
//                 theme === "dark"

//                 ?

//                 <FaSun className="text-yellow-400" />

//                 :

//                 <FaMoon className="text-gray-700" />

//             }

//         </button>

//     );

// };

// export default ThemeToggle;