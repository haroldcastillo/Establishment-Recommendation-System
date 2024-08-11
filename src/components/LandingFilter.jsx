import React from 'react';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';
import usePopover from '@/hooks/usePopover';
import { EstablishmentType, BarangayList } from "@/lib/constants";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from '@/store/actions/establishments';

export default function LandingFilter() {
  const dispatch = useDispatch();
  const utils = useSelector((state) => state.establishments.utils);

  const { handleClick, handleClose, PopperComponent } = usePopover();

  const formik = useFormik({
    initialValues: {
      barangay: utils?.barangay || [], // Use an empty array as a fallback
      type: utils?.types || [], // Use an empty array as a fallback
    },
    onSubmit: values => {
      dispatch(setFilterValue(values));
    },
  });

  return (
    <>
      <Tooltip title="Filter">
        <IconButton aria-label="Open Filter" onClick={handleClick}>
          <FilterAltIcon sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>
      <PopperComponent>
        <div className="p-4 w-[100vw] max-w-[400px]">
          <h6 className="font-bold">Filter Establishments</h6>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p>Types</p>
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
            {EstablishmentType.map((type, index) => (
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
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p>Barangay</p>
            <IconButton
              aria-label="Clear Barangay Filter"
              disabled={formik.values.barangay.length === 0}
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  barangay: [],
                });
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
          <div>
            {BarangayList.map((type, index) => (
              <Chip
                key={index}
                label={type}
                variant={formik.values.barangay.includes(type) ? 'filled' : 'outlined'}
                className="m-1"
                onClick={() => {
                  if (formik.values.barangay.includes(type)) {
                    formik.setValues({
                      ...formik.values,
                      barangay: formik.values.barangay.filter(t => t !== type),
                    });
                  } else {
                    formik.setValues({
                      ...formik.values,
                      barangay: [...formik.values.barangay, type],
                    });
                  }
                }}
              />
            ))}
          </div>
          <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: ".6fr 1fr" }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained" color="primary"
              onClick={() => {
                formik.handleSubmit();
                handleClose();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </PopperComponent>
    </>
  );
}
