// library
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";

// redux
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { decrementSeconds } from "./timerSlice";

const TimerComponent = () => {
  // redux function
  const dispatch = useDispatch();

  // redux state
  const seconds = useSelector((state: RootState) => state.timer.seconds);

  // setting time per second
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        dispatch(decrementSeconds());
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
