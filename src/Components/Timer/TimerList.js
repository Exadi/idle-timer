import React, { useState } from "react";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import notifIcon from "assets/notif.png";
import Notification from "react-web-notification";
import "./TimerList.scss";

function TimerList() {
  const timers = useSelector(state => state.timers);

  //notification title
  const [title, setTitle] = useState("");
  const [ignore, setIgnore] = useState(false);
  const [options, setOptions] = useState({});
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  //TODO figure out how to only display the timers in the slice, but still have the other ones running
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
    if (ignore) {
      return;
    }

    const now = Date.now();

    const title = "Idle Timer";
    const body = name + " Complete!";
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

    //options must be set first, as notification appears when title is set
    setOptions(options);
    setTitle(title);
  };

  return (
    <div className="timerList">
      <h1 onClick={() => setOpen(!open)}>Timers ({timers.length})</h1>

      <div className={open ? "timerListBox open" : "timerListBox closed"}>
        {timersSlice.length > 0 ? (
          <div className="timer-list-pagination">
            <span className="timer-list-pagination-arrow">
              {prevVisible ? (
                <button onClick={() => setPage(Math.max(0, page - 1))}>
                  &lt;
                </button>
              ) : null}
            </span>
            <span className="timer-list-pagination-current">
              {page + 1}/{lastPage + 1}
            </span>
            <span className="timer-list-pagination-arrow">
              {nextVisible ? (
                <button
                  visible={nextVisible}
                  onClick={() => setPage(Math.min(page + 1, lastPage))}
                >
                  &gt;
                </button>
              ) : null}
            </span>
          </div>
        ) : null}

        {timersSlice.length > 0 ? (
          timersSlice.map((timer, i) => {
            return (
              <Timer
                key={i}
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

      <Notification
        ignore={ignore && title !== ""}
        notSupported={() => setIgnore(true)}
        onPermissionGranted={() => setIgnore(false)}
        onPermissionDenied={() => setIgnore(true)}
        timeout={5000}
        title={title}
        options={options}
      />
    </div>
  );
}

export default TimerList;
