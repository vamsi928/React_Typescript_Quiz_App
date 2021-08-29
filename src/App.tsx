import React, { useState } from "react";

import { QuestionCard } from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState } from "./API";

import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type answerObject = {
  question: string; //the question
  answer: string; //will have the user selected answer
  correct: boolean; //answer correct or not
  correctAnswer: string; //The actual correct answer for that question
};

function App() {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<Boolean>(true);

  //Call the API
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    //console.log(newQuestions);

    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setUserAnswer([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //userAnswer
      const answer = e.currentTarget.value;
      //check the answer
      const correct = questions[number].correct_answer === answer;
      console.log(correct);
      //add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
      }
      //save answer is answerObject
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else setNumber((prev) => ++prev);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <button type="button" className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score :{score}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !isLoading && (
          <button
            className="next"
            onClick={nextQuestion}
            disabled={number === TOTAL_QUESTIONS - 1}
          >
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
}

export default App;
