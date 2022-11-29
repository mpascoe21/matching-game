import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Timer from "../Timer";

const CountdownTimer = ({time, setTime, isActive, isPaused}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (time === 0) {
      navigate("/level-error");
    }
  })

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time > 0 ? time - 10 : time);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <div>
      <Timer time={time} />
    </div>
  );
}

export default CountdownTimer;
