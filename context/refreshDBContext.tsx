import { createContext, useContext, useState } from "react";

type RefreshDBContextType = {
  refresh: number;
  triggerRefresh: () => void;
};

const RefreshDBContext = createContext<RefreshDBContextType>({
  refresh: 0,
  triggerRefresh: () => {},
});
export const RefreshDBProvider = ({ children }: any) => {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <RefreshDBContext.Provider
      value={{
        refresh,
        triggerRefresh,
      }}
    >
      {children}
    </RefreshDBContext.Provider>
  );
};

export const useRefreshDB = () => useContext(RefreshDBContext);

export default RefreshDBContext;
