import { combineReducers } from "redux";
const timers = (state = [], action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return state.concat(action.payload);
    default:
      return state;
  }
};

const allReducers = combineReducers({
  timers
});

export default allReducers;
