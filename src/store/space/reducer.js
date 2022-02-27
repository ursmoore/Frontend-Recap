const initialState = {
  spaces: null,
  spaceDetails: null,
};

export default function reducer(state = initialState, action) {
  // console.log("the action", action);
  switch (action.type) {
    case "spaces/getSpaces": {
      return {
        ...state,
        spaces: action.payload,
      };
    }
    case "spaces/getSpaceById": {
      console.log("the action", action);
      return {
        ...state,
        spaceDetails: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
