import { Image, Stack } from "@chakra-ui/react";

import Navbar from "./components/navbar";
import PreQuiziz from "./components/pre";
import Quiz from "./components/quiz";
import Result from "./components/result";

import BgImg from "@/assets/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchQuestion,
  questionsSelectors,
  setAllQuestions,
  setStatus,
} from "./questionSlice";

const Questions = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const status = useSelector((state: any) => state.questions.status);
  const allQuestions = useSelector(questionsSelectors.selectAll);

  const current = useSelector((state: any) => state.questions.current);

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

  useEffect(() => {
    if (status === "pre") {
      dispatch(fetchQuestion());
      if (localStorage.getItem("questions")) {
        dispatch(
          setAllQuestions(JSON.parse(localStorage.getItem("questions")))
        );
      }
    }
  }, [status]);

  useEffect(() => {
    if (localStorage.getItem("status") === "pre") {
      dispatch(fetchQuestion());
    }
  }, [localStorage.getItem("status")]);

  useEffect(() => {
    if (localStorage.getItem("questions")) {
      dispatch(setAllQuestions(JSON.parse(localStorage.getItem("questions"))));
    }
  }, [localStorage.getItem("questions")]);

  useEffect(() => {
    if (localStorage.getItem("status")) {
      dispatch(setStatus(localStorage.getItem("status")));
    }
  }, [localStorage.getItem("status")]);

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
