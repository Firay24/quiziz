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

const Navbar = () => {
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
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Text fontWeight="normal">Dan Abrahmov</Text>
        </HStack>
      </HStack>
      {/* <Progress value={80} size={"sm"} /> */}
    </Stack>
  );
};

export default Navbar;
