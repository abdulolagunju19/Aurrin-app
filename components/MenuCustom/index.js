import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Text, Spacer } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import Link from "next/link";

import React from "react";

const MenuCustom = ({ isMenuOpen }) => {
  return (
    <div>
      <Menu isOpen={isMenuOpen}>
        <MenuButton as={Button} variant={"outline"} colorScheme={"blue"} size={"sm"} mr={4} leftIcon={<AddIcon />}>
          New Goal
        </MenuButton>
        <MenuList>
          <MenuGroup title="I want to plan my">
            <Link href="/long-term-plan/retirement">
              <MenuItem>
                Retirement
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to calculate my">
            <Link href="/returns">
              <MenuItem>
                Returns
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to buy a new">
          <Link href="/purchase-plan/product">
            <MenuItem>
              Product
              <Spacer />
              <Text fontWeight={"semibold"} color={"gray.300"} fontSize={".8rem"}>
                Car, Home{" "}
              </Text>
            </MenuItem>
          </Link>
        </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MenuCustom;
