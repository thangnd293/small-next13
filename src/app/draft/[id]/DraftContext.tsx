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
  isPreviewMode: boolean;
  isOpenSidebar: boolean;
  isSaved: boolean;
  isSaving: boolean;
  toggleSidebar: () => void;
  changeIsSaving: (isSaving: boolean) => void;
  changeIsPreviewMode: (isPreviewMode: boolean) => void;
}

const initialValue: DraftContextValue = {
  isPreviewMode: false,
  isOpenSidebar: true,
  toggleSidebar: () => {},
  isSaved: false,
  isSaving: false,
  changeIsSaving: () => {},
  changeIsPreviewMode: () => {},
};
const DraftContext = createContext<DraftContextValue>(initialValue);
export const useDraftContext = () => useContext(DraftContext);

export const DraftProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
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

  const changeIsPreviewMode = useCallback((isPreviewMode: boolean) => {
    setIsPreviewMode(isPreviewMode);
  }, []);

  const value = useMemo(
    () => ({
      isOpenSidebar,
      isSaved,
      isSaving,
      isPreviewMode,
      toggleSidebar,
      changeIsSaving,
      changeIsPreviewMode,
    }),
    [isOpenSidebar, isSaved, isSaving, isPreviewMode]
  );
  return (
    <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
  );
};
