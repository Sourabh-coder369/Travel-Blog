import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Usercontext } from "../usercontext.jsx";
import { useContext } from "react";

export function Postpage(){
    const params=useParams();
    const [singlePost,setsinglePost]=useState(null);
    const [newdate,setnewdate]=useState(null);
    const {userinfo,setuserinfo}=useContext(Usercontext);

    useEffect(()=>{fetch(`http://localhost:4000/posts/${params.id}`,{
        method:'GET',
        }).then(res=>{return res.json()}).then(data=>{
        setsinglePost(()=>(data));
    })},[])

        /*useEffect(() => {
            if (singlePost && singlePost.createdAt) {
                const date = new Date(singlePost.createdAt);
                setnewdate(date.toLocaleDateString('en-GB'));
            }
    }, [singlePost]);*/

    function formatCreatedAt(createdAt) {
        const dateObj = new Date(createdAt); // Convert the MongoDB timestamp to a Date object

        const date = dateObj.getDate(); // Get the day of the month (1-31)
        const year = dateObj.getFullYear();

        // Get the month as a string (e.g., "January")
        const month = dateObj.toLocaleString("default", { month: "long" });

        console.log("date",`${date} ${month} ${year}`)

        return `${date} ${month} ${year}`;
    }

    return(
        <div className="">
            {singlePost && (
                <>
                <div className="pl-48 pt-6">
                    {userinfo &&(
                        <button className="bg-black text-xl text-white p-4 rounded-md"><Link to={`/editpost/${singlePost._id}`}>Edit Post</Link></button>)}
                    {!userinfo &&(
                        <p className="text-xl font-medium">!! Login To Edit the Post</p>
                    )
                    }
                </div>
                <div className="p-6 w-full flex items-end justify-center">
                    <div className="flex justify-center"><img className="rounded-md w-[80%]" src={'http://localhost:4000/'+singlePost.cover}></img></div>
                    <div className="absolute translate-y-[-56px] flex flex-col items-center">
                        <div className="font-medium text-2xl w-[80%] text-white flex justify-center gap-10">{singlePost.locations.map(item=>(
                            <div>{item}</div>
                        ))}</div>
                        <div className="text-white text-5xl font-bold flex flex-col items-center gap-4">
                            <h1 className="w-[80%] text-center">{singlePost.title}</h1>
                            <div className='flex justify-center gap-4 font-normal text-3xl'>
                                <p>{"By "+singlePost.author.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="w-full flex justify-center">
                        <div className="w-[80%] p-4">
                            <p className="text-2xl font-medium">Created At {formatCreatedAt(singlePost.createdAt)}</p>
                            <div className={"pt-12 text-3xl font-light"}>
                                <p style={{lineHeight:1.5}}>{singlePost.content}</p>
                                <p className="pt-10">{singlePost.summary}</p>
                            </div>
                        </div>
                    </div>
                </>

            )}
        </div>
    )
}