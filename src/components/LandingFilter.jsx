import React from 'react'
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip'
import usePopover from '@/hooks/usePopover';

export default function LandingFilter() {
  const {handleClick,handleClose,PopperComponent} = usePopover();

  return <>
    <Tooltip title="Filter">
      <IconButton aria-label="Open Filter" onClick={handleClick}>
        <FilterAltIcon sx={{color:"black"}}/>
      </IconButton>
    </Tooltip>
    <PopperComponent>
      <div>
        Popover here
      </div>
    </PopperComponent>
  </>
}
