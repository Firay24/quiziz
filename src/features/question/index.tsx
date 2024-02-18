import { Image, Stack } from "@chakra-ui/react";

import Navbar from "./components/navbar";
// import PreQuiziz from "./components/pre";
import Quiz from "./components/quiz";
// import Result from "./components/result";

import BgImg from "@/assets/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchQuestion,
  questionsSelectors,
  setAllQuestions,
} from "./questionSlice";

const Questions = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const allQuestions = useSelector(questionsSelectors.selectAll);

  const current = useSelector((state: any) => state.questions.current);

  useEffect(() => {
    if (!localStorage.getItem("isSubmit")) {
      dispatch(fetchQuestion());
      localStorage.setItem("isSubmit", "false");
    }
    if (localStorage.getItem("questions")) {
      dispatch(setAllQuestions(JSON.parse(localStorage.getItem("questions"))));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("isSubmit") === "true") {
      dispatch(fetchQuestion());
    }
  }, [localStorage.getItem("isSubmit")]);

  useEffect(() => {
    if (localStorage.getItem("questions")) {
      dispatch(setAllQuestions(JSON.parse(localStorage.getItem("questions"))));
    }
  }, [localStorage.getItem("questions")]);

  useEffect(() => {
    if (allQuestions) {
      setQuestion(allQuestions[current]);
    }
  }, [current, allQuestions]);

  return (
    <Stack>
      {/* background image */}
      <Stack position="fixed" zIndex={90} bottom={0}>
        <Image
          src={BgImg}
          alt="image background"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="top"
        />
      </Stack>

      <Stack zIndex={100}>
        {/* navbar section */}
        <Navbar />

        {/* body section */}
        <Stack alignItems="center">
          {/* <PreQuiziz /> */}
          <Quiz question={question && question} />
          {/* <Result /> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Questions;
