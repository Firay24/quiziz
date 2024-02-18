import { Button, Heading, Stack, Text } from "@chakra-ui/react";

const PreQuiziz = () => {
  return (
    <Stack minHeight="80vh" justifyContent="center" alignItems="center" gap={5}>
      <Heading as="h2" size="2xl">
        Selamat Datang di Quiziz
      </Heading>
      <Stack width="70%" textAlign="center">
        <Text fontSize="20px">
          Quiz terdiri dari 5 pertanyaan dengan durasi waktu 2 menit. Apabila
          waktu telah habis maka quiz dengan otomatis diselesaikan dengan
          menampilkan skor nilai total jawaban benar dan salah
        </Text>
      </Stack>
      <Button marginTop={3} colorScheme="blue" rounded="full" paddingX={8}>
        Mulai
      </Button>
    </Stack>
  );
};

export default PreQuiziz;
