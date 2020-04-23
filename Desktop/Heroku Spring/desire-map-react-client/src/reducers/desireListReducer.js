import { GET_DESIRE_LIST, GET_DESIRE, DELETE_DESIRE } from "../actions/types";

const initialState = {
  desires: [],
  desire: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DESIRE_LIST:
      return {
        ...state,
        desires: action.payload,
      };

    case GET_DESIRE:
      return {
        ...state,
        desire: action.payload,
      };

    case DELETE_DESIRE:
      return {
        ...state,
        desires: state.desires.filter(
          (desire) => desire.desireSequence !== action.payload
        ),
      };

    default:
      return state;
  }
}
