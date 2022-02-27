/* eslint-disable import/no-anonymous-default-export */
import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "user/storyDeleteSuccess": {
      console.log("user/storyDeleteSuccess", action.payload);
      const newState = { ...state };
      console.log("what is new state?", newState);

      return {
        ...state,
        space: {
          ...state.space,
          stories: state.space.stories.filter(
            (story) => action.payload !== story.id
          ),
        },
      };
    }

    case "user/addStoryToSpace": {
      return {
        ...state,
        space: {},
      };
    }

    /////////FEATURE 6 REDUCER ///// SOMEHOW NOT NEEEDED /////////
    // case "spaces/edit": {
    //   return {
    //     ...state,
    //     space: {
    //       ...state.space,
    //       title: action.payload.title,
    //       description: action.payload.description,
    //       backgroundColor: action.payload.backgroundColor,
    //       color: action.payload.color,
    //       stories: [...state.space.stories],
    //     },
    //   };
    // }

    default:
      return state;
  }
};
