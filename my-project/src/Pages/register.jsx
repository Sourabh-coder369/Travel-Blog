import {useState} from 'react'
export default function Register(){

        let [username,setusername]=useState('')
        let [password,setpassword]=useState('')
    
        function submission(event){
            event.preventDefault();
            fetch('http://localhost:4000/register',{
                method:'Post',
                body:JSON.stringify({username,password}),
                headers:{'content-Type':'application/json'}})
                .then((res) => {
                console.log(res);
                  if(res.status === 200){
                    window.alert("Registration Succesful");
                  }
                  else{
                    window.alert("Registartion Failed");
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });}

    return(
        <div className="pt-[200px] flex justify-center items-center">
            <form className="flex flex-col w-[50%] gap-4 border-black p-10 pt-4" onSubmit={submission}>
                <h1 className="text-center text-3xl font-medium p-4 rounded-md bg-black text-white">Register</h1>
                <input className="w-full text-xl bg-gray-200 border-none outline-0 p-5 rounded-md" type="text" placeholder="Username" value={username} onChange={(event)=>{setusername(event.target.value)}}></input>
                <input className="w-full text-xl bg-gray-200 border-none outline-0 p-5 rounded-md" type="text" placeholder="Password" value={password} onChange={(event)=>{setpassword(event.target.value)}}></input>
                <button className="w-full text-center p-3 rounded-md bg-black text-xl text-white">Submit</button>
            </form>
        </div>)
}