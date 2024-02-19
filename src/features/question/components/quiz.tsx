// library
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

// icons
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiTimeFill } from "react-icons/ri";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrent, setStatus, updateUserAnswer } from "../questionSlice";
import { RootState } from "@/app/store";

// components
import TimerComponent from "@/features/timer";

const Quiz = ({ question }: { question: any }) => {
  // react function
  const dispatch = useDispatch();
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  // redux state
  const current = useSelector((state: any) => state.questions.current);
  const seconds = useSelector((state: RootState) => state.timer.seconds);

  // when timer is up, quiz is over
  useEffect(() => {
    if (seconds === 0) {
      dispatch(setStatus("submit"));
      dispatch(setCurrent(0));
    }
  }, [seconds]);

  return (
    <Stack paddingX={{ base: 0, md: 20 }} width={{ base: "90%", md: "70%" }}>
      {/* head */}
      <Flex direction={{ base: "column", md: "row" }}>
        {/* current question section */}
        {!isMobile ? (
          <Stack>
            <Text fontWeight="semibold" color="gray.400">
              {`Question ${current + 1}`}
            </Text>
          </Stack>
        ) : null}

        <Spacer />

        {/* timer and progress section */}
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
          {isMobile ? <Spacer /> : null}
          <HStack>
            <Stack
              padding={1}
              backgroundColor="blue.100"
              color="blue.500"
              rounded="full"
            >
              <RiTimeFill />
            </Stack>
            <TimerComponent />
          </HStack>
        </HStack>
      </Flex>

      {/* body */}
      <Stack marginTop={5}>
        {/* current question section */}
        {isMobile ? (
          <Stack>
            <Text fontWeight="semibold" color="gray.400">
              {`Question ${current + 1}`}
            </Text>
          </Stack>
        ) : null}
        <Stack minHeight="55vh">
          {/* question */}
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium">
            {question && question.question}
          </Text>

          {/* answers */}
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
            {/* prev questions */}
            <IconButton
              isDisabled={current === 0}
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="prev question"
              icon={<IoIosArrowBack />}
              onClick={() => current !== 0 && dispatch(setCurrent(current - 1))}
            />

            {/* next question */}
            <IconButton
              isDisabled={current === 4}
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="next questions"
              icon={<IoIosArrowForward />}
              onClick={() => current !== 4 && dispatch(setCurrent(current + 1))}
            />
          </HStack>
          <Spacer />

          {/* submit button */}
          <Button
            colorScheme="blue"
            rounded="full"
            onClick={() => {
              dispatch(setStatus("submit"));
              dispatch(setCurrent(0));
            }}
          >
            Submit
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Quiz;
