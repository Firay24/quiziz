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

const Quiz = () => {
  return (
    <Stack paddingX={20} width="70%">
      {/* head */}
      <HStack>
        <Text fontWeight="semibold" color="gray.400">
          Questions 1
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
            <Text color="gray.400">1/5 Questions</Text>
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
        <Text fontSize="2xl" fontWeight="medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum ...
        </Text>

        <Stack marginTop={5} gap={5}>
          {Array.from({ length: 4 }, (_, index) => (
            <Stack
              key={index}
              paddingY={2}
              paddingX={5}
              border="1px"
              borderColor="gray.200"
              rounded="xl"
              backgroundColor="white"
              cursor="pointer"
              _hover={{
                backgroundColor: "blue.50",
                fontWeight: "semibold",
              }}
            >
              <Text>Makanan bergizi</Text>
            </Stack>
          ))}
        </Stack>

        <HStack marginTop={5}>
          <HStack>
            <IconButton
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="Search database"
              icon={<IoIosArrowBack />}
            />
            <IconButton
              colorScheme="blue"
              rounded="full"
              size="sm"
              aria-label="Search database"
              icon={<IoIosArrowForward />}
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
