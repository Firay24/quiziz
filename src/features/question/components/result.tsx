import { Button, HStack, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  return (
    <Stack
      textAlign="center"
      minHeight="70vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      paddingY={5}
      paddingX={20}
      boxShadow="md"
      rounded="xl"
    >
      <Heading as="h2" size="lg" color="blue.500">
        Congratulation
      </Heading>
      <Text color="gray.500">
        Kamu menyelesaikan{" "}
        <Text as="span" fontWeight="semibold">
          5 soal
        </Text>{" "}
        dari{" "}
        <Text as="span" fontWeight="semibold">
          5 soal
        </Text>
      </Text>
      <Stack marginTop={3} gap={0}>
        <Text fontWeight="medium">Skor Anda</Text>
        <Heading as="h2" size="4xl" color="green.500">
          100
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
          <Text fontWeight="medium">5 soal</Text>
        </HStack>
        <HStack>
          <HStack>
            <Text color="red.400" fontSize="20px">
              <GoXCircleFill />
            </Text>
            <Text>Jawaban salah</Text>
          </HStack>
          <Spacer />
          <Text fontWeight="medium">0 soal</Text>
        </HStack>
      </Stack>

      <HStack justifyContent="center" marginTop="8" width="full">
        <Button rounded="full" colorScheme="blue">
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
