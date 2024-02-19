import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setStatus } from "../questionSlice";

const PreQuiziz = () => {
  const dispatch = useDispatch();
  return (
    <Stack minHeight="80vh" justifyContent="center" alignItems="center" gap={5}>
      <Heading
        as="h2"
        size={{ base: "xl", md: "2xl" }}
        textAlign="center"
        width={"80%"}
      >
        Selamat Datang di Quiziz
      </Heading>
      <Stack width="70%" textAlign="center">
        <Text fontSize={{ base: "16px", md: "20px" }}>
          Quiz terdiri dari 5 pertanyaan dengan durasi waktu 2 menit. Apabila
          waktu telah habis maka quiz dengan otomatis diselesaikan dengan
          menampilkan skor nilai total jawaban benar dan salah
        </Text>
      </Stack>
      <Button
        marginTop={3}
        colorScheme="blue"
        rounded="full"
        paddingX={8}
        onClick={() => dispatch(setStatus("quiz"))}
      >
        Mulai
      </Button>
    </Stack>
  );
};

export default PreQuiziz;
