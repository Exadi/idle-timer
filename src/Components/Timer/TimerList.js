import React, { useState } from "react";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import notifIcon from "assets/notif.png";

function TimerList() {
  const timers = useSelector(state => state.timers);

  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  let timersSlice = [];

  if (timers.length > 0) {
    timersSlice = timers.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    );
  }

  let lastPage = Math.max(0, Math.floor((timers.length - 1) / itemsPerPage));
  let prevVisible = page > 0;
  let nextVisible = page < lastPage;

  const sendNotification = name => {
    const now = Date.now();

    const title = "Idle Timer";
    const body = 'The timer "' + name + '" is complete!';
    const tag = now;
    const icon = notifIcon;

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr"
    };

    //doing it this way because it would be unused if I assigned it to a variable
    new Notification(title, options);
  };

  return (
    <div className="timerList">
      {timersSlice.length > 0 ? (
        <div className="timer-list-pagination">
          <span className="timer-list-pagination-arrow">
            {prevVisible ? (
              <i
                className="fas fa-arrow-circle-left"
                onClick={() => setPage(Math.max(0, page - 1))}
              ></i>
            ) : null}
          </span>
          <span className="timer-list-pagination-current">
            {page + 1}/{lastPage + 1}
          </span>
          <span className="timer-list-pagination-arrow">
            {nextVisible ? (
              <i
                className="fas fa-arrow-circle-right"
                onClick={() => setPage(Math.min(page + 1, lastPage))}
              ></i>
            ) : null}
          </span>
        </div>
      ) : null}

      {timers.length > 0 ? (
        timers.map((timer, i) => {
          return (
            <Timer
              visible={
                timersSlice.find(item => item.name === timer.name)
                  ? true
                  : false
              }
              /*key must be unique and not change when a timer is deleted or weird stuff happens. e.g. taking the time remaining of the timer that had that key before*/
              key={timer.name}
              name={timer.name}
              seconds={timer.seconds}
              sound={timer.sound}
              notification={() => sendNotification(timer.name)}
            ></Timer>
          );
        })
      ) : (
        <div>There are no timers yet.</div>
      )}
    </div>
  );
}

export default TimerList;
