import {createContext,useState} from 'react';
export const Usercontext=createContext({});


export function UserProvider({children}){
    const [userinfo,setUserInfo]=useState(null);

    return(
        <Usercontext.Provider value={{userinfo,setuserinfo: setUserInfo}}>
            {children}
        </Usercontext.Provider>
    )
}