import React, { useState } from 'react';    
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineAppstore } from "react-icons/ai";
import ClickAwayListener from '@mui/base/ClickAwayListener';

const CheckboxDropdown = () => {

  const [columnName, setcolumnName] = useState([]);
  const [arr, setArr]=useState([]);
  const [open, setOpen] = useState(false);
  
  const handleClickAway = () => {
    setOpen(false);
  };

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
  {name:'Loan Number', value:'loanNum' },
  {name:'Primary Borrower', value:'name'},
  {name:'Property Address', value:'address'},
  {name:'City', value:'city'},
  {name:'State', value:'state'},
  {name:'Loan Amount', value:'amount'},
  {name:'Loan Type', value:'type'},
  {name:'Product', value:'product'},
  {name:'Status', value:'status'},
  {name:'Days', value:'days'},
];
const HandleChange = (event) => {
  const {
    target: { value },
  } = event;
  const val={value};
    setArr(arr=>[val])
    setcolumnName(
      typeof value === 'string' ? value.split(',') : value,
      );
}

const handelSubmit = (arr) => {
  sessionStorage.setItem("colHide", JSON.stringify(arr[0].value));
}

return (
  <div style={{display:'flex',alignItems:'center'}}>
    <ClickAwayListener onClickAway={handleClickAway}>
    <FormControl sx={{ m: 1, width: 120 }}>
      <Select
        displayEmpty
        multiple
        value={columnName}
        onChange={HandleChange}
        MenuProps={MenuProps}
        variant="standard"
        renderValue={()=>{return (<em><AiOutlineAppstore/> COLUMN</em>)}}
        style={{outline:'none',textDecorationLine:'none'}}
        data-testid='dropdown'
      >
        <MenuItem disabled value="">
            <em>Select and Confirm</em>
          </MenuItem>
        {names.map(({name,value}) => (
          <MenuItem key={name} value={value} data-testid='checkbox-option'>
            <Checkbox checked={columnName.indexOf(value) > -1} data-testid='checkbox'/>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
        <MenuItem>
          <button style={{padding:'8px',borderRadius:'5px', border:'none', backgroundColor:'blue', color:'white'}} onClick={()=>{
            handelSubmit(arr);
            }}>Confirm</button>
        </MenuItem>
      </Select>
    </FormControl>
    </ClickAwayListener>
  </div>
);
}

export default CheckboxDropdown;