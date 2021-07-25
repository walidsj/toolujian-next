import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout({ children }) {
  return (
    <Box as="main" px={8} maxW={640} mx="auto">
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
