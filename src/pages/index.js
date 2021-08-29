import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { FaArrowRight, FaCreditCard } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";
import { seo } from "../config";
import swal from "sweetalert";
import axios from "axios";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function Home() {
  const router = useRouter();

  const accentColor = useColorModeValue("teal.500", "teal.200");
  const grayColor = useColorModeValue("gray.500", "gray.400");

  const [inputs, setInputs] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleNpm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/signin", inputs);
      router.push("/user");
    } catch (err) {
      const { message } = err.response.data;
      swal("Failed!", message, "error");
      setIsLoading(false);
    }
  };

  return (
    <Box
      as="section"
      d="flex"
      alignItems="center"
      flexDir="column"
      textAlign="center"
      py={4}
    >
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={{
          title: seo.title,
          description: seo.description,
          url: seo.url,
          images: [
            {
              url: `${seo.url}logo.png`,
              width: "350px",
              height: "350px",
              alt: seo.title,
            },
          ],
        }}
      />
      <Box pt={4} maxW={{ lg: 360 }}>
        <Heading mb={4} fontSize={["4xl", "5xl"]} fontWeight="700">
          Save your{" "}
          <Text as="span" color={accentColor}>
            precious
          </Text>{" "}
          time.
        </Heading>
        <form onSubmit={(e) => handleNpm(e)}>
          <Flex justify="center">
            <InputGroup mx="auto">
              <InputLeftElement
                pointerEvents="none"
                fontSize="1.5rem"
                color="gray.400"
                my=".75rem"
                ml=".65rem"
              >
                <FaCreditCard />
              </InputLeftElement>
              <Input
                variant="filled"
                type="number"
                name="npm"
                placeholder="Type your NPM..."
                fontWeight={700}
                fontSize={{ base: "2xl", lg: "3xl" }}
                height="64px"
                pl={14}
                onChange={({ target }) =>
                  setInputs({ ...inputs, [target.name]: target.value })
                }
              />
              {inputs?.npm && (
                <InputRightElement width="4.5rem">
                  <Button
                    mt="1.5rem"
                    fontSize="1.5rem"
                    color={grayColor}
                    type="submit"
                  >
                    {isLoading ? <Spinner /> : <FaArrowRight />}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          </Flex>
          <Text fontSize="xs" py={4} color="gray.500">
            Press{" "}
            <Button
              colorScheme="gray"
              size="xs"
              type="submit"
              aria-label="Enter NPM"
            >
              Enter <AiOutlineEnter />
            </Button>{" "}
            to access your exam data.
          </Text>
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Switch
              id="remember"
              name="remember"
              size="sm"
              colorScheme="teal"
              onChange={({ target }) =>
                setInputs({ ...inputs, [target.name]: !inputs?.remember })
              }
              checked={inputs?.remember}
            />
            <FormLabel htmlFor="remember" ml={2} mb="0">
              Remember me
            </FormLabel>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  if (cookies) {
    const { token } = cookie.parse(cookies);

    if (token) {
      const user = jwt.verify(token, process.env.JWT_KEY);
      if (user)
        return {
          redirect: {
            destination: "/user",
            permanent: false,
          },
        };
    }
  }

  return {
    props: {},
  };
};
