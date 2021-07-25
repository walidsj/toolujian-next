import { extendTheme } from "@chakra-ui/react";

const colorMode = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: true,
});

export default colorMode;
