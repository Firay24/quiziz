import { Image, Stack } from "@chakra-ui/react";

import Navbar from "./components/navbar";
import PreQuiziz from "./components/pre";
import Quiz from "./components/quiz";
import Result from "./components/result";

import BgImg from "@/assets/bg.png";

const Questions = () => {
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
          {/* <Quiz /> */}
          <Result />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Questions;
