import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
import { useNavigate } from 'react-router'
import { useAuth } from '../hook/userAuth'
import { useState } from 'react'

const login = () => {
const navigate=useNavigate();

const {loading,handleLogin}=useAuth();

const [email, setemail] = useState("")
const [password, setpassword] = useState("")
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return(
            <main>
                <h1 className='loading'>Loading....</h1>
            </main>
        )
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e)=>{setemail(e.target.value)}}
                     type="text" id="email" name='email' placeholder='Enter you email' />

                </div>
                <div className="input-group">
                    
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e)=>{setpassword(e.target.value)}}                   
                   type="text" id="password" name='password' placeholder='Enter you password' />
                </div>

                <button className='btn-primary'>Login</button>

                
            </form>

            <p>Create an Account? <Link to={"/register"}>Register</Link></p>
        </div>

    </main>
  )
}

export default login