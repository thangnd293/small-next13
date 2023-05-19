import { useArticlesBookmarked } from "@/services/client";
import { Article, User } from "@/types/common";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalContextValue {
  userInfo: User | null;
  articlesBookmarked: Article[];
  refreshUserInfo: (data?: any) => Promise<Session | null>;
  isArticlesBookedLoading?: boolean;
}

const initialValue: GlobalContextValue = {
  userInfo: null,
  articlesBookmarked: [],
  refreshUserInfo: async () => null,
  isArticlesBookedLoading: false,
};

const GlobalContext = createContext<GlobalContextValue>(initialValue);

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, update } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(data?.user || null);
  const { articles, isLoading: isArticlesBookedLoading } =
    useArticlesBookmarked(userInfo?.id);

  useEffect(() => {
    setUserInfo(data?.user || null);
  }, [data]);

  return (
    <GlobalContext.Provider
      value={{
        userInfo,
        articlesBookmarked: articles,
        refreshUserInfo: update,
        isArticlesBookedLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
