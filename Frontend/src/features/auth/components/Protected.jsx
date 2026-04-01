import React, { Children } from 'react'
import { useAuth } from '../hook/userAuth'
import { Navigate } from 'react-router';


    const Protected= ({children})=>{

    const {loading,user}=useAuth();
    

    if(loading){
        return(
            <main>Loading....</main>
        )
    }
    if(!user){
        return <Navigate to={'/login'}/>
    }


  return children
}


export default Protected