"use client"
import React, { useEffect } from 'react'
import LandingSearchInput from '@/components/LandingSearchInput';
import CardComponent from '@/components/CardComponent';
import { useSelector,useDispatch } from "react-redux";
import { fetchEstablishments } from '@/store/actions/establishments';
import LandingFilter from '@/components/LandingFilter';
import { useRouter } from 'next/navigation';
export default function Recommendation() {
  const dispatch = useDispatch();
  const establishments = useSelector((state) => state.establishments.recommendations);
  const utils = useSelector((state) => state.establishments.utils);
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchEstablishments({
      type: utils.type || [],
      barangay: utils.barangay || [],
      search: utils.search || "",
      currentPage: utils.currentPage || 1,
    }));
  }, [utils.type, utils.barangay, utils.search, utils.currentPage]);

  if(establishments.isLoading){
    return <div>Loading...</div>
  }
  return <>
    <div className="max-w-screen-lg mx-auto p-4">
      <div className='flex justify-between items-end mb-5 flex-wrap'>
        <h1 className='text-[20px] font-semibold opacity-80'>Recommendations</h1>
        <div className='flex justify-center gap-2 items-center'>
          <LandingSearchInput />
          <LandingFilter />
        </div>
      </div>
      {establishments && establishments.data && establishments.data.length > 0 ? (
        <div className='grid gap-4' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {establishments.data.map((item, index) => (
            <CardComponent id={item._id} key={index} title={item.name}  creatorId={item.creatorId} img="images/sss1.jpg" description={item.barangay} onClick={() => {router.push(`/establishment/${item._id}`)}} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-[400px]'>No results found.</div>
      )}
    </div>
  </>
}