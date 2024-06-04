import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/services/users/user.service';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Image from '../../assets/shareehub.png';

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Faculty');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      toast.warning('All fields are required');
      return;
    }

    if (!validator.isEmail(email)) {
      toast.warning('Email is invalid');
      return;
    }

    const registrationProcess = async () => {
      const registrationSuccessful = await registerUser(email, password, firstname, lastname, role);
      if (!registrationSuccessful) {
        throw new Error('Registration failed');
      }
      return registrationSuccessful;
    };

    toast.promise(registrationProcess(), {
      loading: 'Registering...',
      success: () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setRole('Faculty');
        return 'Account has been created successfully';
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  return (
    <div className='bg-[#F0F4F9] h-screen flex justify-center items-center'>
      <Toaster />
      <div className=' bg-[#FFFFFF] w-4/5 h-4/5 md:w-9/12 md:h-[24rem] rounded-3xl md:flex md:justify-between md:mb-14'>
        <div className='px-8 pt-5'>
          <img src={Image} alt='logo' className='w-20 h-20 md:w-28 md:h-auto' />
          <h1 className='text-2xl md:text-3xl md:pb-5 md:pt-0 pb-3 pt-0'>
            Create a Iskobox Account
          </h1>
          <h1 className='text-sm md:text-base '>Enter your Information</h1>
        </div>

        <div className='flex-col flex items-center pt-5 md:pt-8 md:pr-8'>
          <div className='relative w-full min-w-[200px] h-10 mb-5'>
            <input
              className='peer md:w-my-width h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-gray-900'
              type='text'
              id='firstname'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder=' '
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              First Name
            </label>
          </div>

          <div className='relative w-full min-w-[200px] h-10 mb-5'>
            <input
              className='peer md:w-my-width h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-gray-900'
              type='text'
              id='lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder=' '
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              Last Name
            </label>
          </div>

          <div className='relative w-full min-w-[200px] h-10 mb-5'>
            <input
              className='peer md:w-my-width h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-gray-900'
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=' '
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              Email
            </label>
          </div>

          <div className='relative w-full min-w-[200px] h-10 mb-12'>
            <input
              className='peer md:w-my-width h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-gray-900'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=' '
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              Password
            </label>
          </div>

          <div className='md:flex md:items-end md:justify-end md:w-full'>
            <button
              onClick={handleSubmit}
              className='bg-[#FF7D29] text-white text-[12px] px-4 py-2 md:px-8   md:py-3 rounded-3xl hover:bg-[#DC5F00] md:text-sm transition-all duration-300 cursor-pointer'
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className='fixed bottom-7 md:bottom-36 md:ml-my-margin text-right'>
        <div className='flex flex-row'>
          <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
            Help
          </h1>
          <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
            Terms
          </h1>
          <Link to='/'>
            <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
              Sign in
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
