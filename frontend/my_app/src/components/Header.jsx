import {
  Flex,
  Box,
  Button,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderBottom="1px" borderColor="gray.200">
      {/* Top Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        px={6}
        py={4}
      >
        {/* App Title */}
        <Heading size="md">
          <Link to="/">Notes App</Link>
        </Heading>

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "flex" }} gap={2}>
          <Button as={Link} to="/" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/login" variant="ghost">
            Login
          </Button>
          <Button as={Link} to="/signup" variant="ghost">
            Signup
          </Button>
          <Button as={Link} to="/new" colorScheme="teal">
            New Note
          </Button>
        </Flex>

        {/* Mobile Hamburger */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Menu"
          onClick={onToggle}
        />
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          display={{ md: "none" }}
          px={6}
          pb={4}
        >
          <Stack spacing={2}>
            <Button as={Link} to="/" variant="ghost" onClick={onToggle}>
              Home
            </Button>
            <Button as={Link} to="/login" variant="ghost" onClick={onToggle}>
              Login
            </Button>
            <Button as={Link} to="/signup" variant="ghost" onClick={onToggle}>
              Signup
            </Button>
            <Button as={Link} to="/new" colorScheme="teal" onClick={onToggle}>
              New Note
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Header;
