import axios from "axios";

const API_URL = "http://localhost:4000";

//FEATURE 1 -> GET ALL SPACE FOR HOMEPAGE
export function spacesFetched(data) {
  return {
    type: "spaces/getSpaces",
    payload: data,
  };
}

export async function fetchSpaces(dispatch, getState) {
  const response = await axios.get(`${API_URL}/spaces`);
  // console.log("fetch spaces response", response);

  dispatch(spacesFetched(response.data.getAllSpaces));
}

//FEATURE 2 -> GET SPACE BY ID WITH ITS STORIES FOR DETAILSPAGE
export function spaceByIdFetched(data) {
  return {
    type: "spaces/getSpaceById",
    payload: data,
  };
}

export function fetchSpaceById(id) {
  return async (dispatch, getState) => {
    console.log("GOT HERE");
    try {
      const response = await axios.get(`${API_URL}/spaces/${id}`);
      console.log("response ->", response.data.getSpaceById);

      dispatch(spaceByIdFetched(response.data.getSpaceById));
    } catch (e) {
      console.log(e);
    }
  };
}
