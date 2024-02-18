import shuffleArray from "@/util/shuffleArray";
import {
  Button,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiTimeFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrent,
  updateAllAnswer,
  updateUserAnswer,
} from "../questionSlice";
import { useEffect } from "react";

const Quiz = ({ question }: { question: any }) => {
  const dispatch = useDispatch();
  const current = useSelector((state: any) => state.questions.current);
  const answers =
    question &&
    question.incorrect_answers &&
    question.correct_answer &&
    shuffleArray([...question.incorrect_answers, question.correct_answer]);

  useEffect(() => {
    if (question && question.all_answer && question.all_answer.length === 0) {
      dispatch(updateAllAnswer({ id: question.id, all_answer: answers }));
    }
  }, [question]);

  return (
    <Stack paddingX={20} width="70%">
      {/* head */}
      <HStack>
        <Text fontWeight="semibold" color="gray.400">
          {`Question ${current + 1}`}
        </Text>
        <Spacer />
        <HStack gap={5}>
          <HStack>
            <Stack
              padding={1}
              backgroundColor="blue.100"
              color="blue.500"
              rounded="full"
            >
              <FaQuestionCircle />
            </Stack>
            <Text color="gray.400">{`${current + 1}/5 Questions`}</Text>
          </HStack>
          <HStack>
            <Stack
              padding={1}
              backgroundColor="blue.100"
              color="blue.500"
              rounded="full"
            >
              <RiTimeFill />
            </Stack>
            <Text color="gray.400">00"00 Min</Text>
          </HStack>
        </HStack>
      </HStack>

      {/* body */}
      <Stack marginTop={5}>
        <Stack minHeight="55vh">
          <Text fontSize="2xl" fontWeight="medium">
            {question && question.question}
          </Text>

          <Stack marginTop={5} gap={5}>
            {question &&
              question.all_answer &&
              question.all_answer.length > 0 &&
              question.all_answer.map((answer: string, index: number) => (
                <Stack
                  key={index}
                  paddingY={2}
                  paddingX={5}
                  border="1px"
                  borderColor="gray.200"
                  rounded="xl"
                  fontWeight={
                    question && question.user_answer === answer
                      ? "semibold"
                      : "normal"
                  }
                  backgroundColor={
                    question && question.user_answer === answer
                      ? "blue.50"
                      : "white"
                  }
                  cursor="pointer"
                  _hover={{
                    backgroundColor: "blue.50",
                    fontWeight: "semibold",
                  }}
                  onClick={() => {
                    question &&
                      dispatch(
                        updateUserAnswer({
                          id: question.id,
                          user_answer: answer,
                        })
                      );
                    current !== 4 && dispatch(setCurrent(current + 1));
                  }}
                >
                  <Text>{answer}</Text>
                </Stack>
              ))}
          </Stack>
        </Stack>

        {/* buttons */}
        <HStack marginTop={5}>
          <HStack>
            <IconButton
              isDisabled={current === 0}
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="Search database"
              icon={<IoIosArrowBack />}
              onClick={() => current !== 0 && dispatch(setCurrent(current - 1))}
            />
            <IconButton
              isDisabled={current === 4}
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="Search database"
              icon={<IoIosArrowForward />}
              onClick={() => current !== 4 && dispatch(setCurrent(current + 1))}
            />
          </HStack>
          <Spacer />
          <Button colorScheme="blue" rounded="full">
            Submit
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Quiz;
