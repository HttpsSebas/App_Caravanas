import { createContext, useState, useContext } from "react";

const RefreshDBContext = createContext();

export default function RefreshDataProvider({ children }) {
    const [refresh, setRefresh] = useState(0);

    return (
        <RefreshDBContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </RefreshDBContext.Provider>
    );
}

export function useRefreshDB(){
    return useContext(RefreshDBContext);
}