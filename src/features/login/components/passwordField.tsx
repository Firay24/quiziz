// library style
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";

// icons
import { HiEye, HiEyeOff } from "react-icons/hi";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../userSlice";

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    // react function
    const dispatch = useDispatch();
    const { isOpen, onToggle } = useDisclosure();

    // redux state
    const password = useSelector((state: any) => state.user.password);

    // local state
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e: any) => dispatch(setPassword(e.target.value))}
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
