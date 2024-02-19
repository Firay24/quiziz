import shuffleArray from "@/util/shuffleArray";
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
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiTimeFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent, setStatus, updateUserAnswer } from "../questionSlice";

const Quiz = ({ question }: { question: any }) => {
  const dispatch = useDispatch();
  const current = useSelector((state: any) => state.questions.current);
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  return (
    <Stack paddingX={{ base: 0, md: 20 }} width={{ base: "90%", md: "70%" }}>
      {/* head */}
      <Flex direction={{ base: "column", md: "row" }}>
        {!isMobile ? (
          <Stack>
            <Text fontWeight="semibold" color="gray.400">
              {`Question ${current + 1}`}
            </Text>
          </Stack>
        ) : null}

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
            <Text color="gray.400">00:00 Min</Text>
          </HStack>
        </HStack>
      </Flex>

      {/* body */}
      <Stack marginTop={5}>
        {isMobile ? (
          <Stack>
            <Text fontWeight="semibold" color="gray.400">
              {`Question ${current + 1}`}
            </Text>
          </Stack>
        ) : null}
        <Stack minHeight="55vh">
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium">
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
