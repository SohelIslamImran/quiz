import React, { useContext, useEffect, useState } from "react";
import QuizContext from "../context/QuizContext";

const CountDown = () => {
  const { getScore } = useContext(QuizContext);
  const [counter, setCounter] = useState(600);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const convertMS = (sec) => {
    if (sec === 0) return "0:0";
    let minutes = Math.floor((sec - 24 / 3600) / 60);
    let seconds = Math.floor(sec - 24 / 3600 - minutes * 60);
    return minutes + ":" + seconds;
  };

  if (counter === 0) {
    getScore();
  }

  return (
    <div className="quiz-result-box">
      <h3 className="quiz-result-title">Time Left :</h3>
      <h2 className="quiz-result">{convertMS(counter)}</h2>
    </div>
  );
};

export default CountDown;
