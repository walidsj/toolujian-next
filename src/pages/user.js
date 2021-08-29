import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { FiBriefcase, FiCreditCard, FiUsers } from "react-icons/fi";
import { FaBackspace, FaSearch, FaUpload, FaWhatsapp } from "react-icons/fa";
import { seo } from "../config";
import dayjs from "dayjs";
import swal from "sweetalert";
import axios from "axios";
import jwt from "jsonwebtoken";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

export default function User({ user, token }) {
  const router = useRouter();

  const accentColor = useColorModeValue("teal.500", "teal.200");
  const grayColor = useColorModeValue("gray.500", "gray.400");

  const [mahasiswa, setMahasiswa] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/data", "", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMahasiswa(data.data);
      } catch (err) {
        const { message } = err.response.data;
        swal("Failed!", message, "error");
        throw err;
      }
    };

    if (user.npm) fetchData();
  }, [user.npm]);

  const handleCopyFormat = (item, mahasiswa) => {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `LJU_${item.session}_${mahasiswa.prodi.code}_${mahasiswa.class}_${item.code}_${mahasiswa.number}_${mahasiswa.name}_${mahasiswa.npm}`;
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

  if (!mahasiswa)
    return (
      <Box
        as="section"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        pt={6}
        pb={4}
      >
        <NextSeo title={`${user.name} (${user.npm}) - ${seo.title}`} />
        <Spinner />
      </Box>
    );

  if (mahasiswa)
    return (
      <Box as="section" display="flex" flexDir="column" pt={6} pb={4}>
        <NextSeo
          title={`${mahasiswa.name} (${mahasiswa.npm}) - ${seo.title}`}
        />
        <Box as="header" textAlign="center">
          <Heading as="h1" fontSize="4xl">
            {mahasiswa.name}
          </Heading>
          <Heading as="h2" fontSize="xl" fontWeight="400" py={1}>
            {mahasiswa.prodi.name} {mahasiswa.year}
          </Heading>
          <Heading
            as="h3"
            fontSize="sm"
            color={grayColor}
            fontWeight="400"
            pt={1}
            pb={4}
          >
            <Flex
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
            >
              <Icon as={FiCreditCard} />
              <Text ml={1} mr={3}>
                {mahasiswa.npm}
              </Text>
              <Icon as={FiUsers} />
              <Text ml={1} mr={3}>
                {mahasiswa.class}
              </Text>
              <Icon as={FiBriefcase} />
              <Text ml={1} mr={3}>
                {mahasiswa.number}
              </Text>
            </Flex>
          </Heading>
          <Flex alignItems="center" flexDirection="row" justifyContent="center">
            <Link
              href={mahasiswa.link.url}
              aria-label="link upload"
              style={{ textDecoration: "none" }}
              isExternal
            >
              <Button color={grayColor} mx={2} leftIcon={<FaUpload />}>
                Submit Form
              </Button>
            </Link>
            <Link
              href={`https://wa.me/${mahasiswa.jurusan.contact}`}
              aria-label="link upload"
              style={{ textDecoration: "none" }}
              isExternal
            >
              <Button color={grayColor} mx={2} leftIcon={<FaWhatsapp />}>
                Helpdesk
              </Button>
            </Link>
          </Flex>
        </Box>
        <Divider orientation="horizontal" mt={4} mb={12} />
        <Heading mb={3} fontSize={["2xl", "3xl"]} fontWeight="700">
          Your Subjects
        </Heading>
        <InputGroup mx="auto" mb={4}>
          <InputLeftElement pointerEvents="none" color="gray.400">
            <FaSearch />
          </InputLeftElement>
          <Input
            name="search"
            type="text"
            variant="filled"
            placeholder="Type title, code, or lecturer..."
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  setSearch("");
                  Array.from(document.querySelectorAll("input")).forEach(
                    (input) => (input.value = "")
                  );
                }}
                color={grayColor}
              >
                Clear
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
        {mahasiswa.matkul
          .filter((item) => {
            const filtered = (param) => {
              return param.toLowerCase().includes(search.toLowerCase());
            };
            if (search)
              return (
                filtered(item.name) ||
                filtered(item.code) ||
                filtered(item.dosen.name)
              );
            else return true;
          })
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
                    {dayjs(item.date).format("ddd, D MMM YYYY")} - {item.hour}{" "}
                    WIB
                  </Text>

                  <Heading as="h3" fontSize="xl" fontWeight="700">
                    {item.name}
                  </Heading>

                  <Text fontSize="md" fontWeight="400" color={grayColor} py="1">
                    {item.dosen.name}
                  </Text>
                </Box>
                <Box pl={2} textAlign="center" flexDirection="column">
                  <Heading color={accentColor} fontSize="3xl" p="2">
                    {item.session}
                  </Heading>
                  <Button
                    color={grayColor}
                    onClick={() => handleCopyFormat(item, mahasiswa)}
                  >
                    Copy
                  </Button>
                </Box>
              </Flex>
            );
          })}
        <Box textAlign="center">
          <Button
            mt={6}
            leftIcon={<FaBackspace />}
            onClick={async () => {
              try {
                const { data } = await axios.get("/api/signout");
                if (data) return router.push("/");
              } catch (e) {
                swal("Failed!", e.response.data.message, "error");
              }
            }}
            color={grayColor}
          >
            Try Another NPM
          </Button>
        </Box>
      </Box>
    );
}

export const getServerSideProps = async (context) => {
  const token = context.req.headers.cookie?.split("=")[1];

  if (token) {
    const user = jwt.verify(token, process.env.JWT_KEY);
    if (!user)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    return {
      props: { user, token },
    };
  }
};
