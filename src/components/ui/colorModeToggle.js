import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      ml={{ lg: "4" }}
      variant="ghost"
      onClick={toggleColorMode}
      fontSize="1.25rem"
      isRound
      aria-label="Dark mode toggle"
    >
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </IconButton>
  );
}
