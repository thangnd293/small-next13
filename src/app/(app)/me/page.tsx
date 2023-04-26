"use client";

import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import HomeTab from "./HomeTab";
import ListTab from "./ListTab";
import AboutTab from "./AboutTab";
export default function UserInfoPage() {
  return (
    <>
      <Text fontSize="2xl" color="gray.900">
        Nguyen Dac Thang
      </Text>
      <Tabs mt="20px" colorScheme="teal" isLazy size="sm">
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
      </Tabs>
    </>
  );
}
