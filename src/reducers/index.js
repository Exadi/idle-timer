import { combineReducers } from "redux";
const timers = (state = [], action) => {
  console.log("TIMER REDUCER");
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

const allReducers = combineReducers({
  timers
});

export default allReducers;
