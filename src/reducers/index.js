import { combineReducers } from "redux";
const timers = (state = [], action) => {
  switch (action.type) {
    case "ADD_TIMER":
      console.log("Payload: " + action.payload);
      console.log("State Before: " + state);
      return state.concat(action.payload);
    default:
      return state;
  }
};

const allReducers = combineReducers({
  timers
});

export default allReducers;
