import React, { useState } from "react";
import axios from "axios";
const base_url = "https://wa.anhalim.tech/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  const [registerNumber, setRegisterNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const LoginForm = () => {
    document.title = "Login";
    return (
      <div className='bg-white rounded-md shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out py-10'>
        <h2 className='p-3 text-3xl font-bold text-pink-400'>Sign In!</h2>
        <div className='inline-block border-[1px] justify-center w-20 border-blue-400 border-solid'></div>
        {/* Inputs */}
        <div className='flex flex-col items-center justify-center py-4'>
          <input
            type='number'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='628564784xxxxx'></input>
          <input
            type='password'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Password'></input>
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>
        </div>
        <div className='inline-block border-[1px] justify-center w-20 border-blue-400 border-solid'></div>
        <p className='text-blue-400 mt-4 text-sm'>
          Don't have an account?
          <span
            className='text-blue-400 mb-4 text-sm font-medium cursor-pointer create-account'
            onClick={() => setIsLogin(false)}>
            {" "}
            Sign Up
          </span>
        </p>
      </div>
    );
  };

  const SignUpForm = () => {
    document.title = "Sign Up";
    return (
      <div className='bg-white rounded-md shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in py-10'>
        <h3 className='p-3 text-3xl font-bold '>Create Account!</h3>
        <div className='inline-block border-[1px] justify-center w-20 border-white border-solid'></div>
        {/* Inputs */}
        <form className='flex flex-col items-center justify-center mt-2'>
          <input
            onChange={setRegisterName}
            type='text'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Name'></input>
          <input
            onChange={setRegisterNumber}
            type='number'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='6285647847xxxx'></input>
          <input
            onChange={setRegisterPassword}
            type='password'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Password'></input>
          <input
            onChange={(e) => {
              if (e.target.value !== registerPassword)
                alert("Password not match");
            }}
            type='password'
            className='rounded-md px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Re-type password'></input>
          <submit className='cursor-pointer rounded-md m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
            Sign Up
          </submit>
        </form>
        <div className='inline-block border-[1px] justify-center w-20 border-white border-solid'></div>
        <p className=' mt-4 text-sm'>
          Already have an account?
          <span
            className=' mb-4 text-sm font-medium cursor-pointer'
            onClick={() => setIsLogin(true)}>
            {" "}
            Sign In
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className='bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2 bg-slate-900'>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};

export default Login;
