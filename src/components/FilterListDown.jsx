import React from 'react'
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';

export default function FilterListDown({formik,dataList,title}) {
  return <>
    <h6 className="font-bold">Filter Establishments</h6>
    <hr className="my-2" />
    <div className="flex justify-between items-center">
      <p>{title}</p>
      <IconButton
        aria-label="Clear Types Filter"
        disabled={formik.values.type.length < 1}
        onClick={() => {
          formik.setValues({
            ...formik.values,
            type: [],
          });
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </div>
    <div>
      {dataList.map((type, index) => (
        <Chip
          key={index}
          label={type}
          variant={formik.values.type.includes(type) ? 'filled' : 'outlined'}
          className="m-1"
          onClick={() => {
            if (formik.values.type.includes(type)) {
              formik.setValues({
                ...formik.values,
                type: formik.values.type.filter(t => t !== type),
              });
            } else {
              formik.setValues({
                ...formik.values,
                type: [...formik.values.type, type],
              });
            }
          }}
        />
      ))}
    </div>
  </>
}
