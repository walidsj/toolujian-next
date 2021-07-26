import {
  Box,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const socialMedia = [
  { icon: FaGithub, path: "https://github.com/walidsj", title: "Github" },
  {
    icon: FaInstagram,
    path: "https://www.instagram.com/walidbaru",
    title: "Instagram",
  },
  {
    icon: FaTwitter,
    path: "https://www.twitter.com/takutdipantau",
    title: "Twitter",
  },
];

export default function Footer() {
  const accentColor = useColorModeValue("teal.500", "teal.200");
  const grayColor = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <Box as="footer">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          textAlign="center"
          minH="4rem"
          py={7}
          maxW={640}
          mx="auto"
        >
          <Box py={3}>
            <Text fontSize="xs" color={grayColor}>
              Made using{" "}
              <Link href="https://nextjs.org/" color={accentColor} isExternal>
                Next.js
              </Link>
              ,{" "}
              <Link
                href="https://chakra-ui.com/"
                color={accentColor}
                isExternal
              >
                Chakra UI
              </Link>
              , and{" "}
              <Link href="http://vercel.com/" color={accentColor} isExternal>
                Vercel
              </Link>
              .
            </Text>
            <Text fontSize="xs" color={grayColor}>
              © 2020-{new Date().getFullYear()}{" "}
              <Link href="https://walid.id" isExternal>
                <Link color={accentColor}>Walid</Link>
              </Link>
              .
            </Text>
          </Box>
          <Box py={2}>
            {socialMedia.map((item, index) => (
              <Link
                href={item.path}
                aria-label={item.title}
                mx="2"
                key={index}
                isExternal
              >
                <IconButton aria-label={item.title} isRound>
                  <Icon as={item.icon} />
                </IconButton>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
