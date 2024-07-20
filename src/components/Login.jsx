import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin } from '../store/authSlice' //from store
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from './Button'
import {Logo,Input} from './index'

function Login() {
const [error,setError]= useState("")
const dispatch = useDispatch()
const navigate = useNavigate()
const {register, handleSubmit} = useForm()


const login = async(data) => {
   setError("")
   try{
   const session = await authService.login(data)
   if(session){
     const userData = await authService.getCurrentUser()
     if(userData) dispatch(authLogin(userData))
        navigate("/")
   }
}
catch(error){
setError(error.message)
}
}

  return (
    <div>
       <div>
        <div>
            <Logo/>
        </div>
        <h2>Sign in to Your Account</h2>
        <p>Don't have any account
        <Link to= "signup" className=''>
          Sign Up
        </Link>
        </p>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit(login)} className=''>
        {/* div for input components */}
        <div>
            {/* EMAIL INPUT */}
            <Input
                label = "Email: "
                placeholder ="Enter your email"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be a valid address"
                    }
                })}
            />
            {/* PASSWORD INPUT */}
            <Input
                label = "Password: "
                placeholder ="Enter your password"
                type="password"
                {...register("password",{
                    required:true,
                   
                })}
            />
            {/* BUTTON FOR SIGN IN */}
            <Button
            type="submit"
            className="w-full"
            >Sign in</Button>
        </div>
        </form>
       </div>
    </div>
  )
}

export default Login
