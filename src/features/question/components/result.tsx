// library
import { Button, HStack, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// icons
import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";

// redux
import { useDispatch, useSelector } from "react-redux";
import { questionsSelectors, setStatus } from "../questionSlice";

const Result = () => {
  // react function
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const allQuestions = useSelector(questionsSelectors.selectAll);

  // local state
  const [correct, setCorrect] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [answered, setAnswered] = useState<number>(0);

  // calculating the score
  useEffect(() => {
    let correctCount = 0;
    let incorrectCount = 0;
    let answeredCount = 0;

    allQuestions.forEach((question: any) => {
      if (question.user_answer === question.correct_answer) {
        correctCount++;
      }
      if (
        question.user_answer !== "" &&
        question.user_answer !== question.correct_answer
      ) {
        incorrectCount++;
      }
      if (question.user_answer !== "") {
        answeredCount++;
      }
    });

    setCorrect(correctCount);
    setIncorrect(incorrectCount);
    setAnswered(answeredCount);
  }, [allQuestions]);

  return (
    <Stack
      textAlign="center"
      minHeight="70vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor={{ base: "transparent", md: "white" }}
      paddingY={{ base: 0, md: 5 }}
      paddingX={{ base: 0, md: 20 }}
      boxShadow={{ base: "", md: "md" }}
      rounded="xl"
    >
      <Heading as="h2" size="lg" color="blue.500">
        {correct * 20 >= 80 ? "Congratulation" : "Nice Try"}
      </Heading>
      <Text color="gray.500">
        Kamu menyelesaikan{" "}
        <Text as="span" fontWeight="semibold">
          {`${answered} soal`}
        </Text>{" "}
        dari{" "}
        <Text as="span" fontWeight="semibold">
          5 soal
        </Text>
      </Text>
      <Stack marginTop={3} gap={0}>
        <Text fontWeight="medium">Skor Anda</Text>
        <Heading
          as="h2"
          size="4xl"
          color={correct * 20 >= 80 ? "green.500" : "red.500"}
        >
          {correct * 20}
        </Heading>
      </Stack>
      <Stack marginTop={3} color="gray.500">
        <HStack>
          <HStack>
            <Text color="green.500" fontSize="20px">
              <GoCheckCircleFill />
            </Text>
            <Text>Jawaban benar</Text>
          </HStack>
          <Spacer />
          <Text fontWeight="medium">{`${correct} soal`}</Text>
        </HStack>
        <HStack>
          <HStack>
            <Text color="red.400" fontSize="20px">
              <GoXCircleFill />
            </Text>
            <Text>Jawaban salah</Text>
          </HStack>
          <Spacer />
          <Text fontWeight="medium">{`${incorrect} soal`}</Text>
        </HStack>
      </Stack>

      <HStack justifyContent="center" marginTop="8" width="full">
        <Button
          rounded="full"
          colorScheme="blue"
          onClick={() => dispatch(setStatus("pre"))}
        >
          Play Again
        </Button>
        <Spacer />
        <Button
          rounded="full"
          colorScheme="red"
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("login");
          }}
        >
          Logout
        </Button>
      </HStack>
    </Stack>
  );
};

export default Result;
