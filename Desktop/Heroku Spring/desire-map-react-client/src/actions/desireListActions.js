import axios from "axios";
import {
  GET_ERRORS,
  GET_DESIRE_LIST,
  GET_DESIRE,
  DELETE_DESIRE,
} from "./types";

export const addDesire = (desireList_id, desire, history) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/desireList/${desireList_id}`, desire);
    history.push(`/mapBoard/${desireList_id}`);
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

export const getDesireList = (desireList_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/desireList/${desireList_id}`);
    dispatch({
      type: GET_DESIRE_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getDesire = (desireList_id, desire_id, history) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/api/desireList/${desireList_id}/${desire_id}`
    );
    dispatch({
      type: GET_DESIRE,
      payload: res.data,
    });
  } catch (err) {
    history.push("/board");
  }
};

export const updateDesire = (
  desireList_id,
  desire_id,
  desire,
  history
) => async (dispatch) => {
  try {
    await axios.patch(`/api/desireList/${desireList_id}/${desire_id}`, desire);
    history.push(`/mapBoard/${desireList_id}`);
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

export const deleteDesire = (desireList_id, desire_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting map task ${desire_id}, this action cannot be undone`
    )
  ) {
    await axios.delete(`/api/desireList/${desireList_id}/${desire_id}`);
    dispatch({
      type: DELETE_DESIRE,
      payload: desire_id,
    });
  }
};
