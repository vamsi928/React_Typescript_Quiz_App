import React from "react";
import { answerObject } from "../App";

import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

//We have to specific the types of each prop this component receives
type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: answerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

//React.FC is the way we let it typescript know the component type
export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  totalQuestions,
  callback,
  userAnswer,
  questionNumber,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers.map((answer, i) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              type="button"
              disabled={userAnswer ? true : false}
              onClick={callback}
              key={i}
              value={answer}
            >
              <span>{answer}</span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
