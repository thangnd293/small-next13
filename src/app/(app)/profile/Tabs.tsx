"use client";

import {
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import HomeTab from "./HomeTab";
import ListTab from "./ListTab";
import AboutTab from "./AboutTab";

export default function Tabs() {
  return (
    <ChakraTabs mt="20px" colorScheme="teal" isLazy size="sm">
      <TabList>
        <Tab>Trang chủ</Tab>
        <Tab>Danh sách đọc</Tab>
        <Tab>Giới thiệu</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HomeTab />
        </TabPanel>
        <TabPanel>
          <ListTab />
        </TabPanel>
        <TabPanel>
          <AboutTab />
        </TabPanel>
      </TabPanels>
    </ChakraTabs>
  );
}
