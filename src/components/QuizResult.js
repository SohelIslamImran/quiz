import React, { useContext } from "react";
import QuizContext from "../context/QuizContext";

const QuizResult = () => {
  const { score } = useContext(QuizContext);
  return (
    <div className="quiz-result-box">
      <h3 className="quiz-result-title">Your Test Score is</h3>
      <h2 className="quiz-result">
        <span>{score}</span>/10
      </h2>
    </div>
  );
};

export default QuizResult;
