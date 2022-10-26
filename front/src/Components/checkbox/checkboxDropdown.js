import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineAppstore } from "react-icons/ai";
import LandingPage from '../landingPage';
import Data from '../data';

const CheckboxDropdown = () => {

  const [columnName, setcolumnName] = React.useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Loan Number',
  'Primary Borrower',
  'Property Address',
  'City',
  'State',
  'Loan Amount',
  'Loan Type',
  'Product',
  'Status',
  'Days',
];
const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setcolumnName(
    typeof value === 'string' ? value.split(',') : value,
    console.log(value)
  );
  const props={value}
  return(
    <Data {...props}/>
  )
};

return (
  <div style={{display:'flex',alignItems:'center'}}>
    
    <FormControl sx={{ m: 1, width: 120 }}>
      <Select
        displayEmpty
        multiple
        value={columnName}
        onChange={handleChange}
        MenuProps={MenuProps}
        variant="standard"
        renderValue={()=>{return (<em><AiOutlineAppstore/> COLUMN</em>)}}
        style={{outline:'none',textDecorationLine:'none'}}
      >
        <MenuItem disabled value="">
            <em>Select to hide</em>
          </MenuItem>
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={columnName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);
}

export default CheckboxDropdown