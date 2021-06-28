import { createContext, useState } from "react";

const QuizContext = createContext(null);

export const QuizContextProvider = ({ children }) => {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [solution, setSolution] = useState([]);
  const [score, setScore] = useState(0);

  const getScore = () => {
    let score = 0;
    let wrongAnswer = 0;
    const tempSolution = [];

    Object.values(answers).forEach((ans, idx) => {
      if (ans === correctAnswers[idx]) {
        tempSolution.push({ [ans]: "correct" });
        return score++;
      }
      wrongAnswer++;
      tempSolution.push({ [ans]: "wrong" });
      if (wrongAnswer === 4) score--;
      if (wrongAnswer === 8) score--;
    });

    setScore(score);
    if (score < 0) setScore(0);
    setSolution(tempSolution);
  };

  return (
    <QuizContext.Provider
      value={{
        setAnswers,
        score,
        answers,
        setCorrectAnswers,
        getScore,
        solution,
        correctAnswers,
        setIsSubmitted,
        isSubmitted
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
