import { Box } from "@chakra-ui/react";
import Logo from "../ui/logo";
import Navbar from "./navbar";

export default function Header() {
  return (
    <Box as="header">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW={640}
        mx="auto"
        py={6}
      >
        <Logo />
        <Navbar />
      </Box>
    </Box>
  );
}
