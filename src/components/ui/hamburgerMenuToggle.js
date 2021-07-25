import { Box } from "@chakra-ui/react";
import { Turn as Hamburger } from "hamburger-react";

export default function HamburgerMenuToggle({ toggled, toggle }) {
  return (
    <>
      <Box display={{ lg: "none" }}>
        <Hamburger
          hideOutline={false}
          label="hamburger menu"
          size={25}
          toggled={toggled}
          toggle={toggle}
          direction="right"
        />
      </Box>
    </>
  );
}
