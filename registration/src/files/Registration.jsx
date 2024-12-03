import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import toast ,{Toaster} from "react-hot-toast"
const Registration = () => {
const notify= ()=>toast("form submitted sucessfully");
    const {register,handleSubmit,formState,reset}=useForm();
    useEffect(()=>{
      reset({username:"",email:"",password:""})  
    },[reset]);

    const handleFormSubmit=( data)=>{
notify();
      reset();
    }
  return (
    <div className=' flex justify-center h-screen flex-col items-center'>
     <h1 className='font-bold'>Registration</h1> 
     <div  className='border border-gray-400 rounded-md h-40 '>
<form onSubmit={handleSubmit(handleFormSubmit)} className='gap-2 p-4' >
<div>
  <label htmlFor='username'>Username</label> 
  <input type="text"
 placeholder='username'
 {...register("username",{
  required:"the username is required",
  pattern:{
    value:/^[a-zA-Z]+$/,
    message:"usename should only contain letters"
  }
 })}
  />
  {formState.errors.username &&(
    <p className='text-red-500'>
      {formState.errors.username.message}
    </p>
  )}
</div>
<div>
  <label htmlFor="email">Email</label>
  <input type="text" 

  placeholder='email'
  {...register("email",{
    required:"the email is required",
    pattern:{
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message:"invalid email"
    }
  })}
  />
  {formState.errors.email &&(
    <p className='text-red-500'>
{formState.errors.email.message}
    </p>
  )}
</div>
<div>
  <label htmlFor="password">Password</label>
  <input type="text"
  placeholder='password'
  {...register("password",{
    required:"the password is required",
    pattern:{
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
        } 
    

  })}
  />
  {formState.errors.password  &&(
    <p className='text-red-600'>
      {formState.errors.password.message}
    </p>
  )}
</div>
<button type='submit' > Submit</button>
</form>
<div>
  <Toaster/>
</div>
</div> 
    </div>
  )
}

export default Registration