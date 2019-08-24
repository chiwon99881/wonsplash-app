// import
import axios from "axios";
import { Dispatch } from "redux";
import { API_URL, FB_APPID } from "../../utils";
import { Alert, AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
import { ICollect } from "./collect";
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
export interface IProfile {
  id: number;
  username: string;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  is_self: boolean;
  post_count: number;
  images: ICollect[];
}
export interface IMyLikes {
  id: number;
  image: {
    id: number;
    file: string;
    creator: {
      id: number;
      avatar: string;
      username: string;
    };
    is_liked: boolean;
    like_count: number;
    natural_time: string;
    tags: any;
    views: number;
  };
  natural_time: string;
}

// action types
const SAVE_TOKEN = "SAVE_TOKEN";
const LOG_OUT = "LOG_OUT";
const PROFILE = "PROFILE";
const MY_PROFILE = "MY_PROFILE";
const MY_LIKES = "MY_LIKES";
const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";

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
function saveMyProfile(data: IProfile) {
  return {
    type: MY_PROFILE,
    data
  };
}
function saveProfile(data: IProfile) {
  return {
    type: PROFILE,
    data
  };
}
function saveMyLikes(data: IMyLikes[]) {
  return {
    type: MY_LIKES,
    data
  };
}
function saveToggleFollow(userId: number) {
  return {
    type: TOGGLE_FOLLOW,
    userId
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
function registration(
  username: string,
  password1: string,
  password2: string,
  email: string
) {
  return async (dispatch: Dispatch) => {
    return axios
      .post(`${API_URL}/rest-auth/registration/`, {
        username,
        password1,
        password2,
        email
      })
      .then(res => {
        if (res.status === 201) {
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
function getMyProfile() {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token, username }
    } = getState();
    axios
      .get(`${API_URL}/users/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveMyProfile(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function getProfile(username: string) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .get(`${API_URL}/users/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveProfile(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function getMyLikes() {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .get(`${API_URL}/users/mylikes/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveMyLikes(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function follow(userId: number) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    return axios
      .post(`${API_URL}/users/follow/${userId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleFollow(userId));
          return true;
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };
}
function unfollow(userId: number) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    return axios
      .post(`${API_URL}/users/unfollow/${userId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleFollow(userId));
          return true;
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
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
    case MY_PROFILE:
      return applySaveMyProfile(state, action);
    case PROFILE:
      return applySaveProfile(state, action);
    case MY_LIKES:
      return applySaveMyLikes(state, action);
    case TOGGLE_FOLLOW:
      return applyToggleFollow(state, action);
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
function applySaveMyProfile(state, action) {
  const { data } = action;
  return {
    ...state,
    myProfile: data
  };
}
function applySaveProfile(state, action) {
  const { data } = action;
  return {
    ...state,
    profile: data
  };
}
function applySaveMyLikes(state, action) {
  const { data } = action;
  return {
    ...state,
    myLikes: data
  };
}
function applyToggleFollow(state, action) {
  const { userId } = action;
  const { profile } = state;
  if (userId === profile.id) {
    return {
      ...state,
      profile: { ...state.profile, is_following: !state.profile.is_following }
    };
  } else {
    return {
      ...state
    };
  }
}

// export
export const actionCreators = {
  usernameLogin,
  logout,
  facebookLogin,
  registration,
  getMyProfile,
  getProfile,
  getMyLikes,
  follow,
  unfollow
};

export default reducer;
