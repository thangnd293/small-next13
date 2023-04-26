import { User } from "@/types/common";
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

interface UserInfoContextValue {
  userInfo: User | null;
  refeshUserInfo: (data?: any) => Promise<Session | null>;
}

const initialValue: UserInfoContextValue = {
  userInfo: null,
  refeshUserInfo: async () => null,
};

const UserInfoContext = createContext<UserInfoContextValue>(initialValue);

export const UserInfoContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { data, update } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(data?.user || null);

  useEffect(() => {
    setUserInfo(data?.user || null);
  }, [data]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        refeshUserInfo: update,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => {
  return useContext(UserInfoContext);
};
