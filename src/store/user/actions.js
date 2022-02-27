import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// FEATURE 4 DELETE STORY BUTTON !!!!!!!
export const storyDeleteSuccess = (storyId) => ({
  type: "user/storyDeleteSuccess",
  payload: storyId,
});

export const deleteStory = (id) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    console.log("token", token);

    try {
      const response = await axios.delete(
        `${apiUrl}/spaces/delete/stories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Story deleted?", response.data);
      dispatch(storyDeleteSuccess(id));
      // dispatch(appDoneLoading());
    } catch (e) {
      console.log(e);
    }
  };
};

//FEATURE 5 ADD A NEW STORY WITH PICTURE !!!!!
export const addStoryToSpace = (data) => {
  console.log("i am here");
  return {
    type: "user/addStoryToSpace",
    payload: data,
  };
};

export function addStoryToDataBase(name, content, imageUrl, id) {
  console.log("and now i am here!!!!!!!!!");
  return async function thunk(dispatch, getState) {
    console.log("what are the parameters", name, content, imageUrl, id);
    //get token from state
    const token = selectToken(getState());
    if (token === null) return;
    try {
      console.log("Im here fetching token");
      const addedStory = await axios.post(
        `${apiUrl}/spaces/create/story/${id}`,
        { name, content, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("now Im here");
      console.log("added story", addedStory);
      dispatch(addStoryToSpace(addedStory.data));
    } catch (e) {
      console.log(e);
    }
  };
}

//FEATURE 6 EDITING SPACE FORM
export const editSpaceUser = (data) => ({
  // type: "spaces/editSpaceUser",
  type: "user/editSpaceUser",
  payload: data,
});

export const editSpace = (title, description, backgroundColor, color) => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const token = localStorage.getItem("token");
      const spaceId = user.space.id;
      const response = await axios.patch(
        `${apiUrl}/spaces/edit/${spaceId}`,
        { title, description, backgroundColor, color },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response create story", response.data);
      dispatch(editSpaceUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
