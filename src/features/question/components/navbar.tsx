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

import LogoImg from "@/assets/logo.png";
import Iconmg from "@/assets/icon.png";
import { Dropdown, MenuProps, Space } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { questionsSelectors } from "../questionSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const allQuestions = useSelector(questionsSelectors.selectAll);
  const [percent, setPercent] = useState<number>(0);
  const status = useSelector((state: any) => state.questions.status);

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
          {/* <Text fontWeight="normal">Dan Abrahmov</Text> */}
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
      {status === "quiz" ? <Progress value={percent} size={"sm"} /> : null}
    </Stack>
  );
};

export default Navbar;
