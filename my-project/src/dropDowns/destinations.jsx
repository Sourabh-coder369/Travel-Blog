import {Link} from "react-router-dom";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {SearchContext} from "../searchContext.jsx";

export default function Destinations({hover}) {
    const {searchValue,setSearchValue,setSearchFlag}=useContext(SearchContext);
    const navigate=useNavigate();

    function findDestination(e){
        setSearchValue(e.target.innerText);
        setSearchFlag(true)
        setTimeout(()=>{
            navigate('/search')
        },500)
    }
    return(
            <div className={`w-50 bg-black p-4 absolute z-20 top-[100%] left-0 shadow-xl  shadow-black rounded-b-sm transition-opacity duration-500 ease-in-out ${
                hover ? "opacity-100 visible" : "opacity-0 invisible"
            }`}>
                <ul>
                    <li onClick={findDestination} className="border-b-2 py-3 border-b-gray-500 hover:text-orange-400 transition-colors duration-200 ease-in-out">Asia</li>
                    <li onClick={findDestination} className="border-b-2 py-3 border-b-gray-500 hover:text-orange-400 transition-colors duration-200 ease-in-out">Europe</li>
                    <li onClick={findDestination} className="border-b-2 py-3 border-b-gray-500 hover:text-orange-400 transition-colors duration-200 ease-in-out">Africa</li>
                    <li onClick={findDestination} className="border-b-2 py-3 border-b-gray-500 hover:text-orange-400 transition-colors duration-200 ease-in-out">North America</li>
                    <li onClick={findDestination} className="border-b-2 py-3 border-b-gray-500 hover:text-orange-400 transition-colors duration-200 ease-in-out">South America</li>
                </ul>
            </div>
    )
}