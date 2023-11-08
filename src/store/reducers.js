import * as types from "./actionTypes";
// import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  // username: null,
  token: null,
  loadingLogin: false,
  loginError: false,
  // userId: null,
  userData: {},
};

const AuthReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case types.USER_DATA:
      return {
        ...state,
        userData: payload.userData,
      };

    case types.USER_DETAIL:
      return {
        ...state,
        token: payload.token,
        loadingLogin: payload.loadingLogin,
        loginError: payload.loginError,
      };

    default:
      return state;
  }
};

// const initialState = {
//   idValue: 1, // Initial ID
// };

// const activeMenu = createSlice({
//   name: "idValue",
//   initialState,
//   reducers: {
//     changeActiveMenu: (state, action) => {
//       state.idValue = action.payload;
//     },
//   },
// });

// export const { changeActiveMenu } = activeMenu.actions;
// export const {ActiveMenu}= activeMenu.reducer;

export default AuthReducer;
