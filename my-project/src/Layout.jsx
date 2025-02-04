import {Outlet, Link, useNavigate} from 'react-router-dom'
import {useEffect,useState,useRef} from 'react';
import { useContext } from 'react';
import { Usercontext } from './usercontext.jsx';
import {SearchContext} from "./searchContext.jsx";
import Destinations from "./dropDowns/destinations.jsx";

export default function Layout(){
    const {userinfo,setuserinfo}=useContext(Usercontext);
    const scrollTop=useRef(null);
    const {setSearchValue,searchFlag,hover,setHover}=useContext(SearchContext);
    const [presentValue,setPresentValue]=useState('');
    const navigate=useNavigate();
    
    useEffect(() => {
      const fetchProfile = async () => {
          try {
              const res = await fetch('http://localhost:4000/profile', {
                  method: 'GET',
                  credentials: 'include',
              });
              if (res.ok) {
                  const data = await res.json();
                  setuserinfo(data.username);
              } else {
                  console.error('Failed to fetch profile');
              }
          } catch (error) {
              console.error('Error fetching profile:', error);
          }
      };

      fetchProfile();
  }, []);

    async function logout(){
      await fetch('http://localhost:4000/logout',{
        credentials:'include',
        method:'POST',
      })
      setuserinfo(null)
    }



    function searchQuery(e){
        setPresentValue(e.target.value)
        setSearchValue(e.target.value);
        //console.log("searchFlag",searchFlag)
        if(!searchFlag && e.target.value){
            setTimeout(()=>{
                navigate('/search')
            },1000)
        }
    }

    return(
        <main ref={scrollTop} className="h-full max-w-full min-w-[600px] mx-auto pb-72">
            <div className="w-full h-[100px]"></div>
            <header className="fixed w-full translate-y-[-100px] flex justify-between bg-black text-[#eae7e7] p-10 max-h-[100px] z-30">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>

                    <Link to="/" className="text-inherit no-underline">
                        <h1 className="text-3xl">Travel Blogs</h1>
                    </Link>
                </div>

                <div className="flex gap-10  p-1 pr-14">
                    <div className="flex items-center pr-4 gap-2">
                        <button className="cursor-pointer" onClick={searchQuery}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                        <input className="outline-0 w-[400px] p-2 text-xl border-b-2 border-white" type="text" placeholder="Search" value={presentValue} onChange={searchQuery}/>
                    </div>
                    <nav className="flex justify-center items-center text-[#d7d8d9] text-xl gap-10">
                        <Link to="/" className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Home</Link>
                        <Link to="/blogs" className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Blog</Link>
                        <div className="relative group w-44 cursor-pointer" onMouseEnter={() => setHover(true)} onMouseLeave={()=>setHover(false)}>
                            <p className="hover:text-orange-400 transition-colors duration-200 ease-in-out pr-4">Destinations</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 hover:text-orange-400 transition-colors duration-200 ease-in-out absolute right-12 bottom-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                            </svg>
                            <Destinations hover={hover}/>
                        </div>
                    </nav>

                    {!userinfo && (
                        <nav className="flex items-center text-[#d7d8d9] text-xl gap-10">
                            <Link to="/login" className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Login</Link>
                            <Link to="/register" className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Register</Link>
                        </nav>
                    )}

                    {userinfo && (
                        <nav className="flex items-center text-[#d7d8d9] text-xl gap-10">
                            <Link to="/newpost" className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Create New Post</Link>
                            <Link onClick={logout} className="hover:text-orange-400 transition-colors duration-200 ease-in-out">Logout</Link>
                        </nav>
                    )}
                </div>
            </header>
            <Outlet/>
        </main>

    )
}

