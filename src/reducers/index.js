import { combineReducers } from "redux";
const timers = (state = [], action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return state.concat(action.payload);
    case "REMOVE_TIMER":
      //payload is the timer name
      return state.filter(item => item.name !== action.payload);
    default:
      return state;
  }
};
const notifications = (state = true, action) => {
  switch (action.type) {
    case "TOGGLE_DEFAULT_NOTIFICATIONS":
      return !state;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  timers,
  notifications
});

export default allReducers;
