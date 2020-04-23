import axios from "axios";
import { GET_ERRORS, GET_MAPS, GET_MAP, DELETE_MAP } from "./types";

export const createMap = (map, history) => async (dispatch) => {
  try {
    await axios.post("/api/map", map);
    history.push("/board");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getMaps = () => async (dispatch) => {
  const res = await axios.get("/api/map/all");
  dispatch({
    type: GET_MAPS,
    payload: res.data,
  });
};

export const getMap = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/map/${id}`);
    dispatch({
      type: GET_MAP,
      payload: res.data,
    });
  } catch (error) {
    history.push("/board");
  }
};

export const deleteMap = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the map and all the data related to it"
    )
  ) {
    await axios.delete(`/api/map/${id}`);
    dispatch({
      type: DELETE_MAP,
      payload: id,
    });
  }
};
