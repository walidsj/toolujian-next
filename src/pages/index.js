import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCopy,
  FiCreditCard,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { seo } from "../config";
import useSWR from "swr";
import dayjs from "dayjs";
import Image from "next/image";
import swal from "sweetalert";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const accentColor = useColorModeValue("teal.500", "teal.200");
  const grayColor = useColorModeValue("gray.500", "gray.400");

  const imgHeader = useColorModeValue(
    "/logo-outline.svg",
    "/logo-outline-white.svg"
  );

  const [showPassword, setShowPassword] = useState(false);

  const [npmQuery, setNpmQuery] = useState("");
  const [input, setInput] = useState("");

  const [remember, setRemember] = useState(false);

  const handleNpm = async (e) => {
    e.preventDefault();
    if (remember) localStorage.setItem("npm", input);
    setNpmQuery(input);
  };

  useEffect(() => {
    const currentNpm = localStorage.getItem("npm");
    if (currentNpm) setNpmQuery(currentNpm);
  }, []);

  const handleCopyFormat = (item) => {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `LJU_${item.session}_${data.prodi.code}_${data.class}_${item.code}_${data.number}_${data.name}_${data.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    if (
      new Date(item.date).toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      swal("Copied to Clipboard.", `${input.value}`, "success");
    } else {
      swal("Warning, this subject isn't for today.", `${input.value}`, "info");
    }
  };

  const [search, setSearch] = useState("");

  const { data } = useSWR(`/api/mahasiswa/${npmQuery}/matkul`, fetcher);

  if (data)
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <NextSeo
          title={`${data.name} (${data.npm}) - ${seo.title}`}
          description={seo.description}
        />

        <Box as="section" display="flex" flexDir="column" pt={6} pb={4}>
          <Box as="header" textAlign="center">
            <Image
              src={imgHeader}
              width={108}
              height={108}
              alt="logo tooluji"
              placeholder="blur"
              blurDataURL="L5I~of#i004mgjw]-4XA00?wL#xu"
              priority
            />
            <Heading as="h1" fontSize={["3xl", "4xl"]}>
              {data.name}
            </Heading>
            <Heading as="h2" fontSize="lg" fontWeight="400" py={1}>
              {data.prodi.name} {data.year}
            </Heading>
            <Heading as="h3" fontSize="sm" fontWeight="400" pt={1} pb={4}>
              <Flex
                alignItems="center"
                flexDirection="row"
                justifyContent="center"
              >
                <Icon as={FiCreditCard} />
                <Text ml={1} mr={3}>
                  {data.npm}
                </Text>
                <Icon as={FiUsers} />
                <Text ml={1} mr={3}>
                  {data.class}
                </Text>
                <Icon as={FiBriefcase} />
                <Text ml={1} mr={3}>
                  {data.number}
                </Text>
              </Flex>
            </Heading>
          </Box>
          <Divider orientation="horizontal" mt={4} mb={12} />
          <Heading mb={3} fontSize={["2xl", "3xl"]} fontWeight="700">
            Your Subject
          </Heading>
          <InputGroup mx="auto" mb={4}>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <FiSearch />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="Search your subject here..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          {data.matkul
            .filter((item) => item.name.includes(search))
            .map((item) => {
              return (
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  my="3"
                  key={item.id}
                >
                  <Box pr={2}>
                    <Text fontSize="sm" fontWeight="500" py="1">
                      {dayjs(item.date).format("ddd, D MMM YYYY")} - {item.hour}
                    </Text>

                    <Heading as="h3" fontSize="xl" fontWeight="700">
                      {item.name}
                    </Heading>

                    <Text
                      fontSize="md"
                      fontWeight="400"
                      color={grayColor}
                      py="1"
                    >
                      {item.dosen.name}
                    </Text>
                  </Box>
                  <Box pl={2} textAlign="center" flexDirection="column">
                    <Heading color={accentColor} fontSize="3xl" p="2">
                      {item.session}
                    </Heading>
                    <Button onClick={() => handleCopyFormat(item)}>Copy</Button>
                  </Box>
                </Flex>
              );
            })}
        </Box>
        <Box textAlign="center">
          <Button
            mt={6}
            onClick={() => {
              localStorage.removeItem("npm");
              setNpmQuery("");
            }}
          >
            Type New NPM
          </Button>
        </Box>
      </motion.div>
    );

  if (!data)
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
            <form onSubmit={(e) => handleNpm(e)}>
              <Flex justify="center">
                <InputGroup mx="auto">
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1.25rem"
                    color="gray.400"
                    mt={1}
                  >
                    <FiCreditCard />
                  </InputLeftElement>
                  <Input
                    variant="filled"
                    name="npmQuery"
                    placeholder="Type your NPM..."
                    size="lg"
                    fontWeight={600}
                    type={showPassword ? "number" : "password"}
                    onChange={(e) => setInput(e.target.value)}
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
                  id="remember-me"
                  size="sm"
                  colorScheme="teal"
                  onChange={() => setRemember(!remember)}
                  checked={remember}
                />
                <FormLabel htmlFor="remember-me" ml={2} mb="0">
                  Remember me
                </FormLabel>
              </FormControl>
            </form>
          </Box>
        </Box>
      </motion.div>
    );
}
