import { set } from "mongoose";
import { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom"


export function EditPage(){
        const params=useParams();
        const [value, setValue] = useState('');
        const [title,setTitle]=useState('');
        const [summary,setSummary]=useState('');
        const [file,setfile]=useState(null);
        const [flag,setflag]=useState(0);
        const [locations,setLocations]=useState([]);
        const [location,setLocation]=useState("");

        useEffect(()=>{
            fetch(`http://localhost:4000/getpost/${params.id}`,{
                method:"GET",
            }).then((res)=>{return res.json()}).then((editData)=>{
                setTitle(()=>(editData.title));
                setSummary(()=>(editData.summary));
                setValue(()=>(editData.content))
                setLocations(()=>(editData.locations))
            })
        },[])

            function addLocation(){
                setLocations(prev=>[...prev,location]);
                setLocation("");
            }

            function removeLocation(item){
                const updatedLocations=locations.filter((place)=>{
                    return place!==item;
                })
                setLocations([...updatedLocations]);
            }
    
        async function createpost(ev){
            ev.preventDefault();
            const data=new FormData();
            const cleancontent=value.replace(/<\/?p>/g,'')
            data.set('title',title);
            data.set('summary',summary);
            data.set('content',cleancontent);
            data.set('locations',JSON.stringify(locations))

            if(file?.[0]){
                data.set('file',file?.[0])
            }
    
            const res=await fetch(`http://localhost:4000/editpost/${params.id}`,{
                method:'PUT',
                body:data,
                credentials:'include',
            })
    
            setflag(()=>(1));
            res.json().then((data)=>{console.log(data)})
        }
    
        if(flag){
            return <Navigate to={`/posts/${params.id}`}/>
        }
        return(
            <div className='w-full flex justify-center items-center'>
                <div className="newpost w-[800px] pt-16 flex flex-col justify-items-start gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                        className="text-xl p-2 border rounded-md border-[#6a6a6a]"
                    />
                    <br />

                    <input
                        type="file"
                        onChange={ev => setfile(ev.target.files)}
                        placeholder="hi there"
                        className="border-2 p-2 border-[#6a6a6a] rounded-md text-center"
                    />
                    <br />

                    <div className="w-[50%]">
                        <div className="flex flex-wrap gap-2 pb-2 w-[100%]">
                            {locations.map((item,index) => (
                                <div className="p-1 px-2 text-xl text-white bg-blue-500 rounded-md flex items-center" key={index}>
                                    <button className="text-sm pr-1" onClick={()=>(removeLocation(item))}>x</button>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input className="text-xl p-2 border rounded-md border-[#6a6a6a] w-[60%]" type="text" placeholder="Add locations" value={location} onChange={e=>setLocation(e.target.value)} />
                            <button className="bg-blue-500 text-white font-semibold text-lg p-2 m-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={addLocation}>Add location</button>
                        </div>
                    </div>

                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        className=""
                    />

                    <input
                        type="text"
                        placeholder="Summary"
                        value={summary}
                        onChange={ev => setSummary(ev.target.value)}
                        className="text-xl p-2 m-2 border rounded-md border-[#6a6a6a]"
                    />
                    <br />

                    <button onClick={createpost} className="bg-blue-500 text-white font-semibold text-lg p-2 mt-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Submit
                    </button>
                </div>
            </div>
        )
}