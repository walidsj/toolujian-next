import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

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
      {colorMode === "light" ? <FiMoon /> : <FiSun />}
    </IconButton>
  );
}
