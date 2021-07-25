import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun, FaToggleOff, FaToggleOn } from "react-icons/fa";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      ml={{ lg: "4" }}
      variant="ghost"
      onClick={toggleColorMode}
      fontSize="1.5rem"
      isRound
      aria-label="Dark mode toggle"
    >
      {colorMode === "light" ? <FaToggleOff /> : <FaToggleOn />}
    </IconButton>
  );
}
