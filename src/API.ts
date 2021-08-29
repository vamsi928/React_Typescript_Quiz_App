import { shuffleArray } from "./util";

//type of the difficulty for API
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//types of the response
export type questionResult = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: [];
  question: string;
  type: string;
};

//from API we are getting correct and incorrect answers separately but we need then in a single array so below code

export type QuestionState = questionResult & { answers: string[] }; //so here we are taking the questionResult type and adding answers type to it

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const data = await fetch(endPoint).then((res) => res.json());

  return data.results.map((question: questionResult) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
