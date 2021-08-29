import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import Layout from "../layouts";
import theme from "./../themes/index";

import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress
        color="teal"
        showOnShallow={true}
        options={{ easing: "ease", speed: 500, showSpinner: false }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
