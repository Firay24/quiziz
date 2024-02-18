import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import LogoImg from "@/assets/icon.png";
import { PasswordField } from "./components/passwordField";

export const Login = () => (
  <Stack width="full" backgroundColor="blue.50">
    <Stack
      spacing="8"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      width="full"
    >
      <Stack spacing="6" alignItems="center">
        <Stack width="50%">
          <Image src={LogoImg} alt="logo" />
        </Stack>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading as="h1" size="lg" color="blackAlpha.800">
            LOGIN TO QUIZ
          </Heading>
        </Stack>
      </Stack>
      <Box
        width="35%"
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="6" width="full">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input id="email" type="text" />
            </FormControl>
            <PasswordField />
          </Stack>
          <Stack spacing="6">
            <Button colorScheme="blue">Masuk</Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Stack>
);
