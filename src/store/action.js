import * as types from "./actionTypes.js";
import axios from "axios";
// import notificationbox from "../Componets/notificationbox";

export const userLogin = (token) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_DETAIL,
      payload: {
        token: token,
        // loadingLogin: loadingLogin,
        // userId: userId,
        // username: username,
      },
    });
  };
};

// export const userData = (userData) => {
//   return (dispatch) => {
//     dispatch({
//       type: types.USER_DATA,
//       payload: {
//         userData: userData,
//       },
//     });
//   };
// };

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

// export const UrlTo = (url) => {
//   return (dispatch) => {
//     dispatch({
//       type: types.URL,
//       payload: {
//         UrlToGo: url,
//       },
//     });
//   };
// };

export const userLogIn = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_DETAIL,
      payload: {
        token: null,
        loadingLogin: true,
        loginError: false,
      },
    });
    axios
      .post("https://testapi.nhustle.in/dj-rest-auth/login/", {
        email: email,
        password: password,
      })
      .then((d) => {
        console.log(d.status);
        localStorage.setItem("token", d.data.key);
        dispatch({
          type: types.USER_DETAIL,
          payload: {
            token: d.data.key,
            loadingLogin: false,
            loginError: false,
          },
        });
      })
      .catch((e) => {
        // notification["error"]({
        //   message: "Error !!",
        //   description: "Wrong Credentials.",
        // });

        console.log("errorrrrrrr");
        dispatch({
          type: types.USER_DETAIL,
          payload: {
            token: null,
            loadingLogin: false,
            loginError: true,
          },
        });
      });
  };
};

// export const getUserData = (token) => {
//   return (dispatch) => {
//     axios
//       .get("http://localhost:8000/dj-rest-auth/user/", {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       })
//       .then((res) => {
//         // console.log('res', res);
//         dispatch({
//           type: types.USER_DATA,
//           payload: {
//             userData: res.data,
//           },
//         });
//       })
//       .catch((e) => {
//         notification["error"]({
//           message: "Error !!",
//           description: "Something went wrong fetching user data.",
//         });
//       });
//   };
// };
