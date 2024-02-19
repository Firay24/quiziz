import { RootState } from "@/app/store";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementSeconds, resetTimer } from "./timerSlice";

const TimerComponent = () => {
  const dispatch = useDispatch();
  const seconds = useSelector((state: RootState) => state.timer.seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        dispatch(decrementSeconds());
      } else {
        // dispatch(resetTimer());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, seconds]);

  return (
    <Text color={seconds <= 10 ? "red.500" : ""}>
      {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
      {seconds % 60}
    </Text>
  );
};

export default TimerComponent;
