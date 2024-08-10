"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusChecker } from '@/store/actions/auth';

export default function StatusCheckerProvider({ children }) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (firstRun) {
        await dispatch(statusChecker());
        setFirstRun(false);
      }
    };
    fetchData();
  }, [firstRun, dispatch]);

  if (status.isloading) return <div>Loading...</div>;
  return <div>
    {children}
  </div>;
}
