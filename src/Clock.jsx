import { useEffect, useState } from "react";

import "./clock.css";

const Clock = () => {
  const gtime = 10;
  const ptime = 5;

  const [time, setTime] = useState(ptime);
  const [end, setEnd] = useState("P1");
  const [turn, setTurn] = useState(1);
  const [isReadyTime, setIsReadyTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [light, setLight] = useState("");

  const Reset = () => {
    setTime(ptime);
    setIsRunning(false);
    setIsReadyTime(false);
    setLight("");
  };
  const Start = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (time == -1) {
      if (isReadyTime) {
        setTime(gtime);
        setIsReadyTime(false);
      } else {
        if (turn == 1) {
          setIsReadyTime(true);
          setTime(ptime);
          setTurn(2);
        } else {
          if (end === "P1") {
            setEnd("P2");
          } else if (end === "P2") {
            setEnd(1);
          } else {
            setEnd(end + 1);
          }
          setIsReadyTime(true);
          setTime(ptime);
          setTurn(1);
        }
      }
    }
    if (isReadyTime & isRunning) {
      setInterval(() => {
        if (light === "") {
          setLight("red");
        } else {
          setLight("");
        }
      }, 500);
    }
    if (!isReadyTime & isRunning) {
      setLight("green");
    }
  }, [time, isReadyTime, turn, end, isRunning, light]);

  return (
    <div>
      <h1>Archery Clock</h1>
      <div>
        <p>End:{end}</p>
        <p>Time:{time}</p>
        <p>Turn:{turn}</p>
      </div>
      <div>
        <div className={`light ${light === "red" ? "red" : ""}`}></div>
        <div className={`light ${light === "yellow" ? "yellow" : ""}`}></div>
        <div className={`light ${light === "green" ? "green" : ""}`}></div>
      </div>
      <button onClick={Start}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={Reset}>Reset</button>
    </div>
  );
};

export default Clock;
