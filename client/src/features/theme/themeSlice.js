// import { createSlice } from "@reduxjs/toolkit";

// const savedTheme = localStorage.getItem("theme") || "light";

// const initialState = {
//     theme: savedTheme,
// };

// const themeSlice = createSlice({
//     name: "theme",

//     initialState,

//     reducers: {

//         toggleTheme: (state) => {

//             state.theme =
//                 state.theme === "light"
//                     ? "dark"
//                     : "light";

//             localStorage.setItem(
//                 "theme",
//                 state.theme
//             );

//         },

//         setTheme: (state, action) => {

//             state.theme = action.payload;

//             localStorage.setItem(
//                 "theme",
//                 action.payload
//             );

//         },

//     },

// });

// export const {
//     toggleTheme,
//     setTheme,
// } = themeSlice.actions;

// export default themeSlice.reducer;