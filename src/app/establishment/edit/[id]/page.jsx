"use client"
import React, { useEffect } from 'react'
import Textfield from '@/components/Textfield'
import { useFormik } from 'formik'
import { useDispatch,useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextAreaInput from '@/components/TextAreaInput'
import SelectInput from '@/components/SelectInput'
import {BarangayList,EstablishmentType} from '@/lib/constants'
import { createEstablishment } from '@/store/actions/establishments'
import { useRouter } from 'next/navigation'
import { updateEstablishment } from '@/store/actions/establishments'
export default function page({params}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.utils.userId)
  const establishment = useSelector(state => state.establishments.view)
  const update = useSelector(state => state.establishments?.update)

  const formik = useFormik({
    initialValues: {
      name: establishment.data.name || "",
      description: establishment.data.description || "",
      address: establishment.data.address || "",
      barangay: establishment.data.barangay || BarangayList[0],
      phone:  establishment.data.phone || "",
      type: EstablishmentType[0],
      picture: [] | null,
      open: establishment.data.open || "",
      close: establishment.data.close || "",
      facebook: establishment.data.facebook || "",
      creatorId: establishment.data.creatorId || user,
    },
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.description) {
        errors.description = 'Required';
      }
      if (!values.address) {
        errors.address = 'Required';
      }
      if (!values.barangay) {
        errors.barangay = 'Required';
      }
      if (!values.phone) {
        errors.phone = 'Required';
      }
      if (!values.type) {
        errors.type = 'Required';
      }
      if (!values.open) {
        errors.open = 'Required';
      }
      if (!values.close) {
        errors.close = 'Required';
      }
      if (!values.facebook) {
        errors.facebook = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(updateEstablishment({
        ...values,
        _id:establishment.data._id
      }))
    },
  });

  useEffect(()=>{
    if(update.data?._id){
      router.push(`/establishment/${establishment.data._id}`)
      dispatch({type:"RESET_UPDATE_ESTABLISHMENT"})
    }
  },[update,update.data?._id])

  
  if(establishment.isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className='mt-[90px] p-4'>
    <div className="max-w-screen-lg mx-auto p-4">
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-[20px] font-semibold opacity-80'>Update Establishment</h1>
      </div>
      <hr  className='mb-4'/>
      <div className='grid gap-4' style={{gridTemplateColumns:"1fr"}}>
        <Textfield label='Name*' placeholder='Name' 
          type='text' value={formik.values.name} onChange={formik.handleChange} name="name" 
          error={formik.touched.name && formik.errors.name !== undefined}
          errorMessages={formik.errors.name}
        />
        <TextAreaInput label='Description*' placeholder='Description' 
          value={formik.values.description} onChange={formik.handleChange} name="description" 
          error={formik.touched.description && formik.errors.description !== undefined}
          errorMessages={formik.errors.description}
        />
        <div className='flex flex-col md:grid gap-4' style={{gridTemplateColumns:"1fr 1fr"}} >
          <Textfield label='Address*' placeholder='Address' 
            type='text' value={formik.values.address} onChange={formik.handleChange} name="address" 
            error={formik.touched.address && formik.errors.address !== undefined}
            errorMessages={formik.errors.address}
          />
          {/* TODO */}
          <SelectInput label='Barangay*' value={formik.values.barangay} onChange={formik.handleChange} name="barangay" 
            error={formik.touched.barangay && formik.errors.barangay !== undefined}
            errorMessages={formik.errors.barangay}
            options={BarangayList}
          />
        </div>
        <div className='flex flex-col md:grid gap-4' style={{gridTemplateColumns:"1fr 1fr"}} >
          <Textfield label='Facebook Link*' placeholder='Facebook Link' 
            type='text' value={formik.values.facebook} onChange={formik.handleChange} name="facebook" 
            error={formik.touched.facebook && formik.errors.facebook !== undefined}
            errorMessages={formik.errors.facebook}
          />
          <SelectInput label='Establishment Type*' value={formik.values.type} onChange={formik.handleChange} name="type" 
            error={formik.touched.type && formik.errors.type !== undefined}
            errorMessages={formik.errors.type}
            options={EstablishmentType}
          />
        </div>
        <div className='flex flex-col md:grid gap-4' style={{gridTemplateColumns:"1fr .5fr .5fr"}} >
          <Textfield label='Phone*' placeholder='Phone' 
            type='text' value={formik.values.phone} onChange={formik.handleChange} name="phone" 
            error={formik.touched.phone && formik.errors.phone !== undefined}
            errorMessages={formik.errors.phone}
          />
          <Textfield label='Open*' placeholder='Open' 
            type='time' value={formik.values.open} onChange={formik.handleChange} name="open" 
            error={formik.touched.open && formik.errors.open !== undefined}
            errorMessages={formik.errors.open}
          />
          <Textfield label='Close*' placeholder='Close' 
            type='time' value={formik.values.close} onChange={formik.handleChange} name="close" 
            error={formik.touched.close && formik.errors.close !== undefined}
            errorMessages={formik.errors.close}
          />
        </div>

        <div className='flex justify-end gap-4 mt-[2em]'>
          <Button variant="text" color="primary" onClick={()=>{router.back()}}>
            Back
          </Button>
          <Button variant="contained" type='submit' onClick={formik.handleSubmit} color="primary">
            Update
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}