import { GET_MAPS, GET_MAP, DELETE_MAP } from "../actions/types";

const initialState = {
  maps: [],
  map: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MAPS:
      return {
        ...state,
        maps: action.payload,
      };

    case GET_MAP:
      return {
        ...state,
        map: action.payload,
      };

    case DELETE_MAP:
      return {
        ...state,
        maps: state.maps.filter((map) => map.mapIdentifier !== action.payload),
      };
    default:
      return state;
  }
}
