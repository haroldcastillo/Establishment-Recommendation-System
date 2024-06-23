"use client"
import React from 'react'
import { useFormik } from 'formik'
import Textfield from '../components/Textfield'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Chip from '@mui/material/Chip';


const LoginPage = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      let errors:{ username?: string, password?: string ,confirmPassword?:string} = {};
      if (!values.username) {
        errors.username = 'Required Username';
      }
      if (!values.password) {
        errors.password = 'Required Password';
      }
      if (!values.confirmPassword) {
        errors.password = 'Required Confirm Password';
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(process.env.NEXT_PUBLIC_SAMPLE_USERNAME)
      if(values.username === process.env.NEXT_PUBLIC_SAMPLE_USERNAME && values.password === process.env.NEXT_PUBLIC_SAMPLE_PASSWORD){
        router.push('/');
      }
      
    }
  });

  return (
    <div className='bg-[#ececec] w-[100%] min-h-[100vh] flex flex-col items-center justify-center'>
      <div className="p-7 rounded-xl bg-[white] w-[95%] max-w-[400px]">
        <Chip label="Go Back" onClick={()=>{router.back()}}/>
        <h2 className='text-center text-[25px] font-bold text-primary mt-4'>Sign Up</h2>
        <p className='text-center opacity-85'>Register and be part of us</p>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 mt-5'>
          <Textfield label='Username' type='text' placeholder='' value={formik.values.username} onChange={formik.handleChange} name="username" 
            error={formik.touched.username && formik.errors.username !== undefined}
            errorMessages={formik.errors.username}
          />
          <Textfield label='Password' type='password' placeholder='' value={formik.values.password} onChange={formik.handleChange} name="password" 
            error={formik.touched.password && formik.errors.password !== undefined}
            errorMessages={formik.errors.password}
          />
          <Textfield label='Confirm Password' type='password' placeholder='' value={formik.values.confirmPassword} onChange={formik.handleChange} name="password" 
            error={formik.touched.confirmPassword && formik.errors.confirmPassword !== undefined}
            errorMessages={formik.errors.confirmPassword}
          />
          <Button type="submit" variant="contained" color="primary" className='mt-4'>
            Login
          </Button>
          <p className='text-center text-[13px] mt-[-5px] text-[black]/50'>Have an account? <span className='underline text-[black]/80 font-semibold cursor-pointer hover:text-[black]/100' onClick={()=>{ router.push('/login');}}>Login</span></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
