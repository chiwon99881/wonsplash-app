import { applyMiddleware, createStore } from "redux";
import {
  persistStore,
  persistCombineReducers,
  PersistConfig
} from "redux-persist";
import AsyncStorage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";

const middlewares = [thunk];

const persistConfig: PersistConfig = {
  key: "root",
  storage: AsyncStorage
};

const reducer = persistCombineReducers(persistConfig, {
  user
});

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;