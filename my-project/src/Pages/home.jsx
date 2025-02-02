import Post from '../post.jsx'
import { useState,useEffect } from 'react'
import mountains from '../assets/mountains.jpg'


export default function Postlist(){
    let [displayData,setdisplaydata]=useState(null)

    useEffect(()=>{
        fetch('http://localhost:4000/post',{
            method:'get',
            credentials:'include',
        }).then((res)=>{return res.json()}).then(data=>{setdisplaydata(data)})
    },[]) 

    return(
    <div>
        <div className="flex justify-center items-center shadow-sm shadow-black">
            <img className="w-full h-100 object-cover" src={mountains}/>
            <div className="absolute text-white text-3xl font-bold font-stretch-50%">Recent Travel Blogs</div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center pt-12">
            <div className="text-4xl text-center" style={{fontFamily:"fantasy"}}>Blogs Posts</div>
            <hr className="w-3/4 border-gray-600 border-2 text-center"/>
        </div>
        <div className="w-full px-30 py-10 grid grid-cols-3 gap-28">
            {displayData && (
                displayData.map((data)=>(

                    <Post {...data}/>

                ))
            )}
        </div>
    </div>
    )

}
