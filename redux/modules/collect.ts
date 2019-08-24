import { Dispatch } from "redux";
import axios from "axios";
import { API_URL } from "../../utils";
// import

// types
export interface ICollect {
  creator: {
    avatar: string;
    id: number;
    username: string;
  };
  file: string;
  id: number;
  is_liked: boolean;
  like_count: number;
  natural_time: string;
  tags: any;
  views: number;
}

// action type
const FEED = "FEED";
const SEARCH = "SEARCH";
const DETAIL = "DETAIL";
const TOGGLE_LIKE = "TOGGLE_LIKE";
const MY_FOLLOWING_IMAGES = "MY_FOLLOWING_IMAGES";
// action creator
function saveFeed(data: ICollect[]) {
  return {
    type: FEED,
    data
  };
}
function saveSearch(data: ICollect[]) {
  return {
    type: SEARCH,
    data
  };
}
function saveDetail(data: ICollect) {
  return {
    type: DETAIL,
    data
  };
}
function saveToggleLike(imageId: number) {
  return {
    type: TOGGLE_LIKE,
    imageId
  };
}
function saveMyFollowingImages(data: ICollect[]) {
  return {
    type: MY_FOLLOWING_IMAGES,
    data
  };
}

// action API
function feed() {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .get(`${API_URL}/collects/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveFeed(res.data));
        } else {
          console.log("Error =>", res.status, res.statusText);
        }
      })
      .catch(err => console.log(err));
  };
}
function search(searchTerm: string) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .get(`${API_URL}/collects/search/?term=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveSearch(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function detail(imageId: number) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .get(`${API_URL}/collects/detail/${imageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveDetail(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function likePhoto(imageId: number) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .post(`${API_URL}/collects/like/${imageId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 201) {
          dispatch(saveToggleLike(imageId));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function unlikePhoto(imageId: number) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    axios
      .delete(`${API_URL}/collects/unlike/${imageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleLike(imageId));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function getMyFollowingImages() {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { username, token }
    } = getState();
    axios
      .get(`${API_URL}/collects/${username}/followings/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveMyFollowingImages(res.data));
        } else {
          console.log("Error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function uploadPhoto(photoUri: string, tags: any) {
  return (dispatch: Dispatch, getState: any) => {
    const {
      user: { token }
    } = getState();
    return axios
      .post(
        `${API_URL}/collects/post/`,
        {
          file: photoUri,
          tags
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        if (res.status === 201) {
          return true;
        } else {
          console.log("Error =>", res.status, res.statusText, res.data);
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
  collects: []
};

// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FEED:
      return applySaveFeed(state, action);
    case SEARCH:
      return applySaveSearch(state, action);
    case DETAIL:
      return applySaveDetail(state, action);
    case TOGGLE_LIKE:
      return applyToggleLikePhoto(state, action);
    case MY_FOLLOWING_IMAGES:
      return applySaveMyFollowingImages(state, action);
    default:
      return state;
  }
}

// reducer function
function applySaveFeed(state, action) {
  const { data } = action;
  return {
    ...state,
    collects: data
  };
}
function applySaveSearch(state, action) {
  const { data } = action;
  return {
    ...state,
    searchCollects: data
  };
}
function applySaveDetail(state, action) {
  const { data } = action;
  return {
    ...state,
    detailCollect: data
  };
}
function applyToggleLikePhoto(state, action) {
  const { imageId } = action;
  const { detailCollect } = state;
  if (detailCollect.id === imageId) {
    return {
      ...state,
      detailCollect: {
        ...state.detailCollect,
        is_liked: !state.detailCollect.is_liked
      }
    };
  } else {
    return {
      ...state
    };
  }
}
function applySaveMyFollowingImages(state, action) {
  const { data } = action;
  return {
    ...state,
    followingImages: data
  };
}

// export
export const actionCreators = {
  feed,
  search,
  detail,
  likePhoto,
  unlikePhoto,
  getMyFollowingImages,
  uploadPhoto
};

export default reducer;
