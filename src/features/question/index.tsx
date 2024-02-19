// library
import { Image, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// components
import Navbar from "./components/navbar";
import PreQuiziz from "./components/pre";
import Quiz from "./components/quiz";
import Result from "./components/result";

// assets
import BgImg from "@/assets/bg.png";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestion,
  questionsSelectors,
  setAllQuestions,
} from "./questionSlice";

const Questions = () => {
  // redux function
  const dispatch = useDispatch();

  // redux state
  const status = useSelector((state: any) => state.questions.status);
  const allQuestions = useSelector(questionsSelectors.selectAll);
  const current = useSelector((state: any) => state.questions.current);

  // local state
  const [question, setQuestion] = useState([]);

  // when first rendering page, set status, current for question index and isSubmit a quiz
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      localStorage.setItem("status", "pre");
    }
    if (!localStorage.getItem("current")) {
      localStorage.setItem("current", "0");
    }
    if (!localStorage.getItem("isSubmit")) {
      localStorage.setItem("isSubmit", "false");
    }
  }, []);

  // when the user wants to start, get question
  useEffect(() => {
    if (status === "pre") {
      dispatch(fetchQuestion() as any);

      // save a question in localstorage "questions"
      const storedQuestions = localStorage.getItem("questions");
      if (storedQuestions !== null) {
        dispatch(setAllQuestions(JSON.parse(storedQuestions)));
      }
    }
  }, [status]);

  // get a question redux state from localstorage when user refresh a page
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions !== null) {
      dispatch(setAllQuestions(JSON.parse(storedQuestions)));
    }
  }, [localStorage.getItem("questions")]);

  // select questions by index
  useEffect(() => {
    if (allQuestions) {
      setQuestion(allQuestions[current]);
    }
  }, [current, allQuestions]);

  return (
    <Stack>
      {/* background image */}
      <Stack position="fixed" zIndex={90} bottom={0} width="full">
        <Image
          src={BgImg}
          alt="image background"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        />
      </Stack>

      <Stack zIndex={100}>
        {/* navbar section */}
        <Navbar />

        {/* body section */}
        <Stack alignItems="center">
          {status === "pre" ? (
            <PreQuiziz />
          ) : status === "quiz" ? (
            <Quiz question={question && question} />
          ) : status === "submit" ? (
            <Result />
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Questions;
