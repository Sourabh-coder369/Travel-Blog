
import tent from '../assets/tent_night.jpg'
import travel from '../assets/solotravel.jpg'
import destination from '../assets/destination.jpg'
import wildlife from '../assets/wildlife.jpg'
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {SearchContext} from "../searchContext.jsx";

export default function HomeInterface() {
    const {hover,setHover,setSearchValue}=useContext(SearchContext);

    useEffect(()=>{
        return(()=>setHover(false));
    },[])

    function clickDestination(){
        setHover(true);
    }

    function clickWildlife() {
        setSearchValue('Wildlife');
    }
    return (
        <div className="">
            <div className="relative flex justify-center shadow-sm shadow-black">
                <img src={tent} alt="beautiful night" className="h-170 w-[100%] object-cover"/>
                <div className="absolute translate-y-20 flex flex-col justify-center items-center gap-12">
                    <div className="text-7xl text-neutral-300 te">Explore.Dream.Discover</div>
                    <h1 className="text-neutral-200 text-3xl">This is a travel blog featuring beautiful destinations,new experiences and hidden places around the globe</h1>
                    <h1 className="text-neutral-200 text-3xl">Please Tag along!</h1>
                    <button className="cursor-pointer bg-transparent rounded-sm  border-4 border-neutral-300 font-bold text-3xl text-neutral-300 p-5 hover:bg-black opacity-70 transition:bg-color duration-200 ease-in-out"><Link to='/blogs'>Start exploring</Link></button>
                </div>
            </div>
            <div className="pt-20">
                <div className="flex justify-center items-center gap-4 w-full">
                    <hr className="border-t border-gray-600 w-1/4"/>
                    <span className="text-8xl" style={{fontFamily:"fantasy"}}>Features</span>
                    <hr className="border-t border-gray-600 w-1/4"/>
                </div>
                <div className="flex justify-center gap-12 w-full pt-18">
                    <Link className="w-1/4 flex flex-col items-center gap-4" to='/blogs'><img className="w-full h-70 object-cover rounded-md" src={travel}/><h1 className="text-4xl">Travel Blogs</h1></Link>
                    <Link onClick={clickDestination} className="w-1/4 flex flex-col items-center gap-4"><img className="w-full h-70 object-cover rounded-md" src={destination}/><h1 className="text-4xl">Destinations</h1></Link>
                    <Link to='/search' onClick={clickWildlife} className="w-1/4 flex flex-col items-center gap-4"><img className="w-full h-70 object-cover rounded-md" src={wildlife}/><h1 className="text-4xl">Wildlife</h1></Link>
                </div>
            </div>
        </div>
    )
}