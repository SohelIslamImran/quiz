import React from "react";

import Options from "./Options";

// The API data of questions return HTML Entities, So it has to be parsed
const parsEntities = (entities) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${entities}`,
    "text/html"
  ).body.textContent;
  return decodedString;
};

const Question = ({ quiz, num }) => {
  const ansNo = `answerNo${num + 1}`;
  return (
    <div className="question-box">
      <p className="question-number">Question {num + 1}</p>
      <h3 className="question">{parsEntities(quiz.question)}</h3>
      <div className="option-box">
        {quiz.options.map((option, idx) => (
          <Options
            key={option + idx}
            option={parsEntities(option)}
            num={idx}
            ansNo={ansNo}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
