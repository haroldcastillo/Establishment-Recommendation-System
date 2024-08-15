"use client"
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { EstablishmentType } from '@/lib/constants';
import { useFormik } from 'formik';
import { updatePreferences } from '@/store/actions/user';

export default function Preference({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user?.data);
  const preferencesIsOpen = useSelector(state => state?.user?.preferences?.isOpen);
  const [isNoPreference, setIsNoPreference] = useState(false);

  const formik = useFormik({
    initialValues: {
      preferences: [],
      id: user?._id,
    },
    onSubmit: values => {
      dispatch(updatePreferences({
        id: user?._id,
        preferences: values.preferences,
      }));
    },
  });

  useEffect(() => {
    if (user?.name && user?.preferences.length === 0) {
      setIsNoPreference(true);
    }else{
      setIsNoPreference(false);
    }
  }, [user]);


  return (
    <>
      {isNoPreference ? (
        <div className='flex flex-col items-center justify-center h-[100vh]'>
          <h1 className='text-[20px] font-bold text-center'>You have not set your preference yet</h1>
          <p className='text-[14px] text-center'>Please set your preference to continue</p>
          <div className='mt-[40px] flex gap-4 flex-wrap justify-center p-4 max-w-[700px]'>
            {EstablishmentType.map((item, index) => {
              const isSelected = formik.values.preferences.includes(item);
              return (
                <div
                  key={index}
                  className={'py-[2em] px-[1.5em] rounded-lg bg-[white] shadow-lg border border-[black]/10 cursor-pointer ' + (isSelected ? 'border-green-500 text-green-500' : '')}
                  onClick={() =>{
                    const isSelected = formik.values.preferences.includes(item);
                    if (!isSelected) {
                      formik.setFieldValue("preferences", [...formik.values.preferences, item]);
                    }else{
                      formik.setFieldValue("preferences", formik.values.preferences.filter(p => p !== item));
                    }
                  }}
                >
                  {item} 
                </div>
              );
            })}
          </div>
          <div className='flex gap-[1em] mt-[3em]'>
            <button
              onClick={()=>{
                dispatch(updatePreferences({
                  id: user?._id,
                  preferences: EstablishmentType,
                }));
              }}
              className='bg-white shadow-lg text-black px-4 py-3 rounded-lg'
            >
              Do this later
            </button>
            <button
              type='submit'
              onClick={formik.handleSubmit}
              className='bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg'
            >
              Save Preference
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
