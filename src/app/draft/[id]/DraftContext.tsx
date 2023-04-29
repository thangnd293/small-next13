"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface DraftContextValue {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  isSaved: boolean;
  isSaving: boolean;
  changeIsSaving: (isSaving: boolean) => void;
}

const initialValue: DraftContextValue = {
  isOpenSidebar: true,
  toggleSidebar: () => {},
  isSaved: false,
  isSaving: false,
  changeIsSaving: () => {},
};
const DraftContext = createContext<DraftContextValue>(initialValue);
export const useDraftContext = () => useContext(DraftContext);

export const DraftProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSidebar = useCallback(
    () => setIsOpenSidebar((prev) => !prev),
    []
  );

  const changeIsSaving = useCallback((isSaving: boolean) => {
    setIsSaved(true);
    setIsSaving(isSaving);
  }, []);

  const value = useMemo(
    () => ({ isOpenSidebar, toggleSidebar, isSaved, isSaving, changeIsSaving }),
    [isOpenSidebar, isSaved, isSaving]
  );
  return (
    <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
  );
};
