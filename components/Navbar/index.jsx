import {
  Box,
  Flex,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";

import MenuCustom from "../MenuCustom";

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Button colorScheme='blue' variant='outline'>
              <Link href={"/"}>Aurrin</Link>
            </Button>
          </HStack> 
          <Flex alignItems={"center"}>
            <MenuCustom />
          </Flex> 
        </Flex>
      </Box>
    </>
  );
}
