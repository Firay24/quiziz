// library style
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
import { useNavigate } from "react-router-dom";

// assets
import LogoImg from "@/assets/icon.png";

// component
import { PasswordField } from "./components/passwordField";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "./userSlice";

const Login = () => {
  // react function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux state
  const email = useSelector((state: any) => state.user.email);
  const password = useSelector((state: any) => state.user.password);

  // handle login button
  const handleLogin = () => {
    if (email === "user@mail.com" && password === "user123") {
      localStorage.setItem("token", "true");
      navigate("/");
    } else {
      alert("login gagal");
    }
  };

  return (
    <Stack width="full" backgroundColor="blue.50">
      <Stack
        spacing="8"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        width="full"
      >
        {/* heading: logo and title */}
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

        {/* login form */}
        <Box
          width={{ base: "90%", md: "35%" }}
          py={{ base: "4", sm: "8" }}
          px={{ base: "5", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
          backgroundColor="white"
        >
          <Stack spacing="6" width="full">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: any) => dispatch(setEmail(e.target.value))}
                />
              </FormControl>
              <PasswordField />
            </Stack>
            <Stack spacing="6">
              <Button colorScheme="blue" onClick={handleLogin}>
                Masuk
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
