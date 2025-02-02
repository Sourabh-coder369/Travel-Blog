import {useContext, useEffect,useState} from "react";
import {SearchContext} from "../searchContext.jsx";
import Post from "../post.jsx";

let searchPrompt="";
let receivedData=false;

export default function Search() {
    const {searchValue,setSearchValue,searchFlag,setSearchFlag}=useContext(SearchContext)
    const [searchData,setSearchData]=useState([]);

    useEffect(()=>{
        setSearchFlag(true);

        return(
            ()=>{
                setSearchFlag(false)
                setSearchData(()=>([]));
            }
        )
    },[])

    async function search(){
        const res =await fetch(`http://localhost:4000/search?searchValue=${searchValue}`,{
            method:'get',
            credentials:'include',
        })
        const data=await res.json();
        receivedData=true
        searchPrompt=searchValue;
        console.log(data)
        setSearchData(data);
    }

    useEffect(() => {
        receivedData=false;
         const id=setTimeout(() => {
             if(searchValue){
                 search();
             }
         },1000)

        return(()=>{
            console.log("Hey there")
            clearTimeout(id)})

    }, [searchValue]);


    return (
        <div className="w-full pt-10">
            {
                searchData.length>0 && (<h1 className="text-center text-2xl font-medium">Search results for {searchPrompt}!!</h1>)
            }
            {
                receivedData && searchData.length===0 && (<h1 className="text-center text-2xl font-medium">No results found for {searchPrompt}!!</h1>)
            }

            <div className="w-full px-30 py-10 grid grid-cols-3 gap-28">
                {searchData && searchData.map((data)=>(
                    <Post {...data}/>
                ))}
            </div>
        </div>
    )
}
