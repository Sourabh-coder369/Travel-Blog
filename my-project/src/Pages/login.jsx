import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import { Usercontext } from '../usercontext.jsx';
import { useContext } from 'react';

export default function Login(){

    let [username,setusername]=useState('')
    let [password,setpassword]=useState('')
    let [redirect,setredirect]=useState(false)
    let {userinfo,setuserinfo}=useContext(Usercontext);

    function submission(event){
        event.preventDefault();
        fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'content-Type':'application/json'},
            credentials:'include',})
            .then((data)=>{return data.json()}).then((data) => {
              console.log('Server response:', data);
              if(data.flag && data.flag===true){
                setredirect(()=>(true));
              }
              else{
                window.alert("Enter the Correct Password");
              }
              return data 
            }).then((data)=>{
                setuserinfo(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
}

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(

            <div className="pt-[200px] flex justify-center items-center">
                <form className="flex flex-col w-[50%] gap-4 border-black p-10 pt-4" onSubmit={submission}>
                    <h1 className="text-center text-3xl font-medium p-4 rounded-md bg-black text-white">Login Details</h1>
                    <input className="w-full text-xl bg-gray-200 border-none outline-0 p-5 rounded-md" type="text" placeholder="Username" value={username} onChange={(event)=>{setusername(event.target.value)}}></input>
                    <input className="w-full text-xl bg-gray-200 border-none outline-0 p-5 rounded-md" type="text" placeholder="Password" value={password} onChange={(event)=>{setpassword(event.target.value)}}></input>
                    <button className="w-full text-center p-3 rounded-md bg-black text-xl text-white">Login</button>
                </form>
            </div>

    )
}