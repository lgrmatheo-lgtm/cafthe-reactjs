/**
 * @file searchContext.jsx
 * Role: Etat global de recherche.
 * Comment c est fait: Evite de prop-driller la valeur du champ recherche entre navbar, home et catalogue.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
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
