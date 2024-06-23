import React,{useState} from 'react'
import {authLogin as login} from '../store/authSlice'
import { useForm } from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'

function SignUp() {
    const[error,setError]=useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try{
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch (login(userData))
                    navigate("/")
                }
            }
        }
        catch(error){
           setError(error.message)
        }
    }
  return (
    <div>
      <div>
        <span><Logo/></span>
      </div>
      <h2>Signup to create account</h2>
      <p>Already have an account?
      <Link to="/login">
        Sign In
      </Link>
      </p>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit(create)}>
        {/* div for input fields */}
         <div>
            {/* INPUT FOR FULL NAME */}
            <Input
                label="Full Name: "
                placeholder = "Enter your full name"
                {...register("name",{
                    required:true
                })}
            />
            {/* INPUT FOR EMAIL */}
            <Input
                label="Email: "
                type="email"
                placeholder = "Enter your email"
                {...register("email",{
                    required:true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"}
                })}
            />
            {/* INPUT FOR PASSWORD */}
            <Input
                label="Password: "
                type="password"
                placeholder = "Enter your full name"
                {...register("name",{
                    required:true
                })}
            />
            {/* Button for Signup */}
            <Button
            type="button"
            className ="w-full"
            >
                Create Account
            </Button>
         </div>
      </form>
    </div>
  )
}

export default SignUp
