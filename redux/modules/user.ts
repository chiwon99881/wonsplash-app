// import
import axios from "axios";
import { Dispatch } from "redux";
import { API_URL, FB_APPID } from "../../utils";
import { Alert, AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
//types
export interface ITokenData {
  token: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    pk: number;
    username: string;
  };
}

// action types
const SAVE_TOKEN = "SAVE_TOKEN";
const LOG_OUT = "LOG_OUT";

// action (creator)
function saveToken(data: ITokenData) {
  return {
    type: SAVE_TOKEN,
    data
  };
}
function savelogOut() {
  return {
    type: LOG_OUT
  };
}
// action API
function usernameLogin(username: string, password: string) {
  return async (dispatch: Dispatch) => {
    return axios
      .post(`${API_URL}/rest-auth/login/`, {
        username,
        password
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToken(res.data));
          return true;
        } else {
          Alert.alert(`Error 😥 ${res.status} | ${res.statusText}`);
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };
}
function facebookLogin() {
  return async (dispatch: Dispatch) => {
    const { token, type } = await Facebook.logInWithReadPermissionsAsync(
      FB_APPID,
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      return axios
        .post(`${API_URL}/users/login/facebook/`, {
          access_token: token
        })
        .then(res => {
          if (res.status === 200) {
            dispatch(saveToken(res.data));
            return true;
          } else {
            Alert.alert(`Error 😥 ${res.status} | ${res.statusText}`);
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    } else {
      return false;
    }
  };
}
function logout() {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .post(`${API_URL}/rest-auth/logout/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(savelogOut());
        } else {
          Alert.alert(`Error 😥 ${res.status} | ${res.statusText}`);
        }
      })
      .catch(err => console.log(err));
  };
}

// initialState
const initialState = {
  isLoggedIn: false
};
// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySaveToken(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    default:
      return state;
  }
}

// reducer Function
function applySaveToken(state, action) {
  const { data } = action;
  return {
    ...state,
    isLoggedIn: true,
    token: data.token,
    username: data.user.username
  };
}
async function applyLogOut(state, action) {
  await AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: "",
    username: ""
  };
}

// export
export const actionCreators = {
  usernameLogin,
  logout,
  facebookLogin
};

export default reducer;
