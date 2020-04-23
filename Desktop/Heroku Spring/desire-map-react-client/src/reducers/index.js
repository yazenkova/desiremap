import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import mapReducer from "./mapReducer";
import desireListReducer from "./desireListReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  map: mapReducer,
  desireList: desireListReducer,
  security: securityReducer,
});
