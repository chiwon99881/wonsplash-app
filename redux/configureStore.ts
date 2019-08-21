import { applyMiddleware, createStore } from "redux";
import {
  persistStore,
  persistCombineReducers,
  PersistConfig
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";
import collect from "./modules/collect";

const middlewares = [thunk];

const persistConfig: PersistConfig = {
  key: "root",
  storage
};

const reducer = persistCombineReducers(persistConfig, {
  user,
  collect
});

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
