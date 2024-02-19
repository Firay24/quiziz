import {
  Avatar,
  HStack,
  Image,
  Progress,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import LogoImg from "@/assets/logo.png";
import { Dropdown, MenuProps, Space } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPower } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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
  return (
    <Stack>
      <HStack width="full" paddingY={4} paddingX={"30px"}>
        {/* logo */}
        <Stack width="15%">
          <Image src={LogoImg} alt="logo" />
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
      {/* <Progress value={80} size={"sm"} /> */}
    </Stack>
  );
};

export default Navbar;
