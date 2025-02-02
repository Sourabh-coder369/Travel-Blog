import { Link } from "react-router-dom"
import mountains from "./assets/mountains.jpg"
export default function Post({title,content,summary,cover,createdAt,_id,locations}){
    console.log(_id)
    function formatCreatedAt(createdAt) {
        const dateObj = new Date(createdAt); // Convert the MongoDB timestamp to a Date object

        const date = dateObj.getDate(); // Get the day of the month (1-31)
        const year = dateObj.getFullYear();

        // Get the month as a string (e.g., "January")
        const month = dateObj.toLocaleString("default", { month: "long" });

        //console.log("date",`${date} ${month} ${year}`)

        return `${date} ${month} ${year}`;
    }
    return(
        <div className="w-full">
            <div className="w-full h-[250px]">
              <Link className=""  to={`/posts/${_id}`}><img className="h-full w-full object-cover rounded-sm" src={'http://localhost:4000/'+cover} alt=""></img></Link>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap gap-2 p-2 justify-center">
                    {locations.map((location)=>(
                        <div className="text-orange-500 text-xl font-medium">{location}</div>
                    ))}
                </div>
              <Link className="p-1" to={`/posts/${_id}`}><h1 className="font-medium text-2xl text-center">{title}</h1></Link>
              <p className="p-2 text-md font-medium">---- {formatCreatedAt(createdAt)}------</p>
              <div className="flex flex-wrap overflow-y-hidden h-19 text-md font-medium">{content}</div>
                <div>....</div>
                <Link to={`/posts/${_id}`}><button className="bg-amber-600 cursor-pointer text-white p-2 text-md font-medium rounded-sm shadow-amber-600 shadow-sm">Read more</button></Link>
            </div>
        </div>
    )
}