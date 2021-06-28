import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Question from "./Question";
import QuizContext from "../context/QuizContext";
import QuizResult from "./QuizResult";
import CountDown from "./CountDown";

const apiUrl =
  "https://opentdb.com/api.php?amount=10&amp;category=18&amp;difficulty=easy&amp;type=multiple";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const { setCorrectAnswers, answers, getScore, isSubmitted, setIsSubmitted } =
    useContext(QuizContext);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(({ data }) => {
        handleData(data.results);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const handleData = (quizzes) => {
    let corrAnswers = [];
    // Random the correct answer
    for (let i = 0; i < quizzes.length; i++) {
      const ques = quizzes[i];
      const options = [...ques.incorrect_answers];
      const random = Math.floor(Math.random() * 4);
      options.splice(random, 0, ques.correct_answer);
      ques.options = options;
      corrAnswers.push(ques.correct_answer);
    }
    setQuestions(quizzes);
    setCorrectAnswers(corrAnswers);
  };

  const handleSubmit = () => {
    console.log(answers);
    if (Object.keys(answers)?.length !== 10) {
      return toast.error(
        "Please select every questions answer and try to submit again"
      );
    }
    getScore();
    setIsSubmitted(true);
  };

  return (
    <main className={isSubmitted ? "quizzes disable" : "quizzes"}>
      {!isStart ? (
        <div className="btn-container">
          <button onClick={() => setIsStart(true)} className="btn-primary">
            Take the Test
          </button>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="spinner" />
          ) : (
            <section className="container">
              {isSubmitted ? <QuizResult /> : <CountDown />}
              {questions.map((question, idx) => (
                <Question
                  key={question.correct_answer + idx}
                  num={idx}
                  quiz={question}
                />
              ))}
              <div className="btn-container">
                <button onClick={() => handleSubmit()} className="btn-primary">
                  Submit Answer
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Quizzes;
