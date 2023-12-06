import * as types from "./actionTypes.js";
import axios from "axios";
// import notificationbox from "../Componets/notificationbox";

export const userLogin = (token) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_DETAIL,
      payload: {
        token: token,
      },
    });
  };
};

export const setSettings = (data) => {
  return (dispatch) => {
    dispatch({
      type: types.SETTINGS,
      payload: {
        settings: data,
      },
    });
  };
};

export const userLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("path");
  return (dispatch) => {
    dispatch({
      type: types.USER_DETAIL,
      payload: {
        token: null,
      },
    });
  };
};

export const userLogIn = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_DETAIL,
      payload: {
        token: null,
        loadingLogin: true,
        loginError: false,
        loginErrorMsg: null,
      },
    });
    axios
      .post("https://api.pancha.kids/dj-rest-auth/login/", {
        email: email,
        password: password,
      })
      .then((d) => {
        localStorage.setItem("token", d.data.key);
        dispatch(getUserData(d.data.key));

        dispatch({
          type: types.USER_DETAIL,
          payload: {
            token: d.data.key,
            loadingLogin: false,
            loginError: false,
            loginErrorMsg: null,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: types.USER_DETAIL,
          payload: {
            token: null,
            loadingLogin: false,
            loginError: true,
            loginErrorMsg: e?.response?.data,
          },
        });
      });
  };
};

export const getUserData = (token) => {
  // alert("hittttttttttttttt");
  return (dispatch) => {
    axios
      .get("https://api.pancha.kids/users/loggedInUser/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        // alert("hi");
        dispatch({
          type: types.USER_DATA,
          payload: {
            userData: res?.data[0],
          },
        });
      })
      .catch((e) => {
        notification["error"]({
          message: "Error!",
          description: "Something went wrong fetching user data.",
        });
      });
  };
};

export const getLanguage = (token) => {
  return (dispatch) => {
    dispatch({
      type: types.LANGUAGE,
      payload: {
        language: [],
        loadingLanguage: true,
        languageError: null,
      },
    });

    axios
      .get("https://api.pancha.kids/pancha/user-language", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((d) => {
        dispatch({
          type: types.LANGUAGE,
          payload: {
            language: d.data,
            loadingLanguage: false,
            languageError: null,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: types.LANGUAGE,
          payload: {
            language: [],
            loadingLanguage: false,
            languageError: err.response?.data,
          },
        });
      });
  };
};
