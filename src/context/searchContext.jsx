import React, { createContext, useState } from "react";

export const SearchContext = createContext(null);

export function SearchProvider({ children }) {
    const [query, setQuery] = useState("");

    const value = {
        query,
        setQuery,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}
