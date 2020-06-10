import React, { useState, useEffect } from "react";
import "./styles.css";
import strftime from "strftime";

//https://albert-gonzalez.github.io/easytimer.js/

function Horloge({
  refreshSeconds,
  dateFormat
}: {
  refreshSeconds: number;
  dateFormat: string;
}): any {
  if (!refreshSeconds || refreshSeconds <= 1) {
    refreshSeconds = 1;
  }
  if (!dateFormat) {
    dateFormat = "%F %T";
  }

  // useState and useEffect are used to have a state on pure functions
  const [date, setDate] = useState(new Date());
  // console.log(
  //   `Rendering every ${refreshSeconds} seconds and "${dateFormat}" as format`
  // );

  useEffect(
    function() {
      // console.log("Starting");
      const interval = setInterval(() => {
        setDate(new Date());
      }, 1000 * refreshSeconds);
      // useEffect returns the function to be called upon element destruction
      return () => {
        // console.log("Stopping");
        clearInterval(interval);
      };
      // useEffect is called upon element rendering IF any of the data is changed
    },
    [refreshSeconds, dateFormat]
  );

  return (
    <div id="current_time">
      <h2>Current Time:</h2>
      <span className="horloge">{strftime(dateFormat, date)}</span>
    </div>
  );
}

export default function App() {
  const [visible, setVisible] = useState(true);
  const [refreshSeconds, setRefreshSeconds] = useState(1);
  const [dateFormat, setDateFormat] = useState("%F %T");

  // const DATE_FORMATS = {
  //  "Full Format": "%F %T",
  //  "Time Only": "%T"
  // };

  return (
    <div className="App">
      <h1>Stoppable Time</h1>
      {visible && (
        <Horloge refreshSeconds={refreshSeconds} dateFormat={dateFormat} />
      )}
      <br />
      <br />
      <button
        title="Increase refresh interval"
        onClick={() => {
          setRefreshSeconds(refreshSeconds + 1);
        }}
      >
        +
      </button>
      <button
        title="Decrease refresh interval"
        onClick={() => {
          setRefreshSeconds(refreshSeconds - 1);
        }}
      >
        -
      </button>
      <button
        title="Toggle clock"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "Stop" : "Start"} !
      </button>
      <br />
      <button
        title="Full Format"
        onClick={() => {
          setDateFormat("%F %T");
        }}
      >
        Full Format
      </button>
      <button
        title="Time Only Format"
        onClick={() => {
          setDateFormat("%T");
        }}
      >
        Time Only
      </button>
    </div>
  );
}
