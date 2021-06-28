import React, { useContext } from "react";

import QuizContext from "../context/QuizContext";

const Options = ({ option, ansNo, num }) => {
  const { correctAnswers, solution, isSubmitted, setAnswers } =
    useContext(QuizContext);

  const correct = correctAnswers.find((corrAns) => corrAns === option);

  return (
    <div
      className="option"
      onClick={() => setAnswers((ans) => ({ ...ans, [ansNo]: option }))}
    >
      <input
        type="radio"
        className={isSubmitted && correct ? "correct" : "wrong"}
        name={ansNo}
        id={`${ansNo}o${num}`}
      />
      <label htmlFor={`${ansNo}o${num}`}>
        <span>{option}</span>
      </label>
    </div>
  );
};

export default Options;
