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

// export
export const actionCreators = {
  feed,
  search,
  detail
};

export default reducer;
