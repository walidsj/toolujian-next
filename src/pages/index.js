import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { FaRegCheckCircle, FaCreditCard, FaRegCircle } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";
import { seo } from "../config";

export default function Home() {
  const accentColor = useColorModeValue("teal.400", "teal.200");
  const grayColor = useColorModeValue("gray.500", "gray.400");

  const [showPassword, setShowPassword] = useState(false);
  const [npm, setNpm] = useState("");

  const [remember, setRemember] = useState(false);

  const handleNpm = (e) => {
    e.preventDefault();
    console.log(npm);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <NextSeo title={seo.title} description={seo.description} />
      <Box
        as="section"
        d="flex"
        alignItems="center"
        flexDir="column"
        textAlign="center"
        py={4}
      >
        <Box pt={4} maxW={{ lg: 360 }}>
          <Heading mb={4} fontSize={["4xl", "5xl"]} fontWeight="700">
            Give you more{" "}
            <Text as="span" color={accentColor}>
              extra
            </Text>{" "}
            time.
          </Heading>
          <form onSubmit={handleNpm}>
            <Flex justify="center">
              <InputGroup mx="auto">
                <InputLeftElement
                  pointerEvents="none"
                  fontSize="1.25rem"
                  color="gray.400"
                  mt={1}
                  children={<FaCreditCard />}
                />
                <Input
                  variant="filled"
                  name="npm"
                  placeholder="Type your NPM..."
                  size="lg"
                  fontWeight={600}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setNpm(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    aria-label="Show or hide password"
                    mt={2}
                    h="1.75rem"
                    size="sm"
                    color="gray.400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Text fontSize="sm" py={4} color="gray.500">
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
            <Flex justify="center" alignItems="center">
              <IconButton
                aria-label="Remember me"
                variant="ghost"
                onClick={() => setRemember(!remember)}
                isRound
              >
                {remember === false ? <FaRegCircle /> : <FaRegCheckCircle />}
              </IconButton>
              <Text>Remember me</Text>
            </Flex>
          </form>
        </Box>
      </Box>
    </motion.div>
  );
}
