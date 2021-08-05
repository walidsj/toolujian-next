import { Box, chakra, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaAppleAlt } from "react-icons/fa";
import Image from "next/image";

export default function Logo() {
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  return (
    <NextLink href="/" passHref>
      <chakra.a>
        <Box display="flex" alignItems="center" py={2}>
          <Box display="flex" alignItems="center">
            <Image
              src="/logo.svg"
              width={52}
              height={52}
              alt="logo tooluji"
              placeholder="blur"
              blurDataURL="L5I~of#i004mgjw]-4XA00?wL#xu"
              priority
            />
          </Box>

          <Box display="flex" flexDirection="column" py={2} pl={2}>
            <Text as="h1" fontSize="1.25rem" fontWeight="700">
              Tooluji
            </Text>
            <Text fontSize="xs" color={subtitleColor}>
              PENG-97/PKN/2021
            </Text>
          </Box>
        </Box>
      </chakra.a>
    </NextLink>
  );
}
