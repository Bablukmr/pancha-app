import * as types from "./actionTypes";
// import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  loadingLogin: false,
  loginError: false,
  loginErrorMsg: null,
  userData: {},
  settings: true,
  language: [],
  loadingLanguage: false,
  languageError: null,
};

const AuthReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case types.USER_DATA:
      return {
        ...state,
        userData: payload.userData,
      };

    case types.SETTINGS:
      return {
        ...state,
        settings: payload.settings,
      };

    case types.LANGUAGE:
      return {
        ...state,
        language: payload.language,
        loadingLanguage: payload.loadingLanguage,
        languageError: payload.languageError,
      };

    case types.USER_DETAIL:
      return {
        ...state,
        token: payload.token,
        loadingLogin: payload.loadingLogin,
        loginError: payload.loginError,
        loginErrorMsg: payload.loginErrorMsg,
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
