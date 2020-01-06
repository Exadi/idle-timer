import React, { useState } from "react";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import notifIcon from "assets/notif.png";
import Notification from "react-web-notification";

function TimerList() {
  //TODO style this component so that it sticks to the bottom of the screen and can be collapsed
  const timers = useSelector(state => state.timers);

  //notification title
  const [title, setTitle] = useState("");
  const [ignore, setIgnore] = useState(false);
  const [options, setOptions] = useState({});
  const [open, setOpen] = useState(false);

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
    <div>
      <h1
        className="title is-1 has-text-centered"
        onClick={() => setOpen(!open)}
      >
        Timers
      </h1>
      <div className={open ? "timerList open" : "timerList"}>
        {timers.map((timer, i) => {
          return (
            <Timer
              key={i}
              name={timer.name}
              seconds={timer.seconds}
              sound={timer.sound}
              notification={() => sendNotification(timer.name)}
            ></Timer>
          );
        })}
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
