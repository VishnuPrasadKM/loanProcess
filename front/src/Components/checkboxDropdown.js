import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineAppstore } from "react-icons/ai";
import Data from './data';

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
  
  // useEffect(()=>{
  //   handelSubmit()
  //   console.log('render');
  // },[columnName])

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
const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  const val={value};
  let props =[];
    <Data {...props}/>;
    setcolumnName(
      typeof value === 'string' ? value.split(',') : value,
      );
      console.log(val);
      props = typeof value === 'string' ? value.split(',') : value
      console.log(props);
      return(
        handelSubmit(props)
      )
      event.preventDefault()
}

const handelSubmit = (props) => {
  console.log(props);
  <Data props={props}/>
}

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
        {names.map(({name,value}) => (
          <MenuItem key={name} value={value}>
            <Checkbox checked={columnName.indexOf(value) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
        <MenuItem>
          <button onClick={()=>{handelSubmit()}}>Confirm</button>
        </MenuItem>
      </Select>
    </FormControl>
  </div>
);
}

export default CheckboxDropdown