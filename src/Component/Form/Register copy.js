import React, { useState } from 'react'
 function Register() {
    const [first_name, setName] = useState("")
    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")

    async function signUp(){
        let item={first_name,password,email}
        console.warn(item)

      let result= await fetch("https://dev.demo-swapithub.com/ecomm/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
            }
        })
        result =await result.json()
        console.warn("result",result)
        
    }
    return (
        <form className='Register_from'>
        <div class="mb-3 ">
            <label  class="form-label">Name</label>
            <input value={first_name} onChange={(e)=>setName(e.target.value)} class="form-control"  />
        </div>
        <div class="mb-3">
            <label  class="form-label">Email address</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="email" class="form-control"   />
        </div>
        <div class="mb-3">
            <label  class="form-label">Password</label>
            <input value={email} onChange={(e)=>setEamil(e.target.value)} type="password" class="form-control"  />
        </div>
        <button onClick={signUp} type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}
export default Register;