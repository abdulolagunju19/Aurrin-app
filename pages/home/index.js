import {
  Flex,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";

import Image from "next/image";

import Layout from "../../components/Layout";
import { TypewritterEffect } from "../../components/TypewriterEffect";
export default function MyGoal() {
  return (
    <Layout>
      <Flex
        align={"center"}
        justify={"center"}
        minH={"md"}
        pt={10}
        pb={10}
        bg="gray.50"
      >
        <VStack>
          <Stack align={"center"} p={3} alignItems={"center"}>
            <Image src="/logo.png" width={250} height={250}/>
            <Flex
              bgGradient="linear(to-l, #7F7FD5, #91EAE4)"
              bgClip="text"
              fontSize={"6xl"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              <TypewritterEffect />
            </Flex>
            <Text fontWeight={"normal"} fontSize={"lg"} color={"gray.600"}>
              Your Well-being, Our Priority.
            </Text>
          </Stack>
        </VStack>
      </Flex>
    </Layout>
  );
}
