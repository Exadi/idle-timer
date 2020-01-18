import { combineReducers } from "redux";
const timers = (state = [], action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return state.concat(action.payload);
    case "REMOVE_TIMER":
      //payload is the timer name
      return state.filter(item => item.name !== action.payload);
    case "UPDATE_TIMER":
      //filter old item from state by name, then add the new item
      //TODO figure out how to keep the original order so the timers don't jump around within the TimerList
      let index = state.findIndex(timer => timer.name === action.payload.name);
      let newState = [...state];
      newState.splice(index, 1, action.payload);
      console.log(index);
      return newState;
    /*state
        .filter(item => item.name !== action.payload.name)
        .concat(action.payload);*/
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
