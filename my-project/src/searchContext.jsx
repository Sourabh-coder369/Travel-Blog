import {createContext,useState} from "react";

export const SearchContext=createContext({});

export default function SearchProvider({children}){
    const [searchValue,setSearchValue]=useState(null);
    const [searchFlag,setSearchFlag]=useState(false);
    const [hover,setHover]=useState(false);

    return(
        <SearchContext.Provider value={{searchValue,setSearchValue,searchFlag,setSearchFlag,hover,setHover}}>
            {children}
        </SearchContext.Provider>
    )
}