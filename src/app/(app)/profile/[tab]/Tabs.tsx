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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type TTab = "home" | "library" | "description";

enum ETab {
  Home = "home",
  Library = "library",
  Description = "description",
}

const tab: Record<ETab, number> = {
  home: 0,
  library: 1,
  description: 2,
};

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const currentTab: ETab = (pathname?.split("/")[2] as ETab) || ETab.Home;

  const [tabIndex, setTabIndex] = useState(tab[currentTab]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    const tabPath = Object.entries(tab)[index][0];
    router.push(`/profile/${tabPath}`);
  };

  return (
    <ChakraTabs
      index={tabIndex}
      onChange={handleTabsChange}
      mt="20px"
      colorScheme="teal"
      isLazy
      size="sm"
    >
      <TabList
        _dark={{
          borderColor: "gray.700 !important",
        }}
      >
        <Tab
          _dark={{
            color: "gray.300",
          }}
        >
          Trang chủ
        </Tab>
        <Tab
          _dark={{
            color: "gray.300",
          }}
        >
          Lưu trữ
        </Tab>
        <Tab
          _dark={{
            color: "gray.300",
          }}
        >
          Giới thiệu
        </Tab>
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
