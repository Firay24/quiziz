// library style
import {
  Avatar,
  HStack,
  Image,
  Progress,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// assets
import LogoImg from "@/assets/logo.png";
import Iconmg from "@/assets/icon.png";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPower } from "react-icons/io5";

// redux
import { useSelector } from "react-redux";
import { questionsSelectors } from "../questionSlice";

const Navbar = () => {
  // react function
  const navigate = useNavigate();

  // ismobile? state
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  // redux state
  const allQuestions = useSelector(questionsSelectors.selectAll);
  const status = useSelector((state: any) => state.questions.status);

  // localstate
  const [percent, setPercent] = useState<number>(0);

  // menu dropdown
  const items: MenuProps["items"] = [
    {
      key: "4",
      danger: true,
      label: "Logout",
      icon: <IoPower />,
      onClick: () => {
        localStorage.setItem("token", "");
        navigate("login");
      },
    },
  ];

  // updated a progress percent of answered
  useEffect(() => {
    let answered = 0;

    if (allQuestions) {
      allQuestions.map((question) => {
        if (question.user_answer !== "") {
          answered++;
        }
      });
    }

    setPercent(answered * 20);
  }, [allQuestions]);

  return (
    <Stack>
      <HStack width="full" paddingY={4} paddingX={"30px"}>
        {/* logo */}
        <Stack width={{ base: "30%", md: "15%" }}>
          <Image src={isMobile ? Iconmg : LogoImg} alt="logo" />
        </Stack>

        <Spacer />

        {/* avatar */}
        <HStack gap={3}>
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size={{ base: "sm", md: "md" }}
          />

          {/* dropdown */}
          <Dropdown menu={{ items }}>
            <Text
              onClick={(e) => e.preventDefault()}
              cursor="pointer"
              _hover={{ color: "blue.500" }}
              fontSize={{ base: "12px", md: "16px" }}
            >
              <Space>
                Dan Abrahmov
                <MdKeyboardArrowDown />
              </Space>
            </Text>
          </Dropdown>
        </HStack>
      </HStack>

      {/* progress section when start quiz */}
      {status === "quiz" ? <Progress value={percent} size={"sm"} /> : null}
    </Stack>
  );
};

export default Navbar;
