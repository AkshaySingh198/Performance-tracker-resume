import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useAuth } from '../hook/userAuth';

const register = () => {

    const navigate=useNavigate();
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {loading,handleRegister} = useAuth();

    const  handleSubmit= async (e)=>{
        e.preventDefault();
        await handleRegister({username,email,password})
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                 <div className="input-group">
                    <label htmlFor="user">User Name</label>
                    <input 
                    onChange={(e)=>{
                        setusername(e.target.value)

                    }}
                    type="text" id="user" name='user' placeholder='Enter you Username' />

                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{
                        setemail(e.target.value)

                    }}
                    type="text" id="email" name='email' placeholder='Enter you email' />

                </div>
                <div className="input-group">
                    
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{
                        setpassword(e.target.value)

                    }}
                    type="text" id="password" name='password' placeholder='Enter you password' />
                </div>

                <button className='btn-primary' type='submit'>Register</button>

                
            </form>

            <p>Already have an Account? <Link to={"/login"}>Login</Link></p>
        </div>

    </main>
  )
}

export default register