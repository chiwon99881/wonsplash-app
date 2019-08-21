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

// action creator
function saveFeed(data: ICollect[]) {
  return {
    type: FEED,
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

// initialState
const initialState = {
  collects: []
};

// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FEED:
      return applyFeed(state, action);
    default:
      return state;
  }
}

// reducer function
function applyFeed(state, action) {
  const { data } = action;
  return {
    ...state,
    collects: data
  };
}

// export
export const actionCreators = {
  feed
};

export default reducer;
