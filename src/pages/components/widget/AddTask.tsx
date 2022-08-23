import React from 'react'
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { z } from "zod";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


const signupUserSchema = z.object({});

function AddTask() {



    const initialValues = {
        id: "",
        username: "",
        password: "",
        role: "",
      };



      const sumbitHandler = (values: any) => {
        console.log(values);
      };





  return (
    <Formik
    initialValues={initialValues}
    validationSchema={toFormikValidationSchema(signupUserSchema)}
    onSubmit={sumbitHandler}
  >
    {({ errors, values, handleChange, isValid }) => (
      <Form className="signupForm">

<TextField id="outlined-basic" label="NO." variant="outlined" />

        <Autocomplete
          // value={values}
          // onChange={handleChange}
          id="combo-box-demo"
          // options={}
          renderInput={(params) => (
            <TextField {...params} label="契約公司" />
          )}
        />
 
        <Autocomplete
          // value={values}
          // onChange={handleChange}
          id="combo-box-demo"
          // options={}
          renderInput={(params) => (
            <TextField {...params} label="地名" />
          )}
        />
      

<TextField id="outlined-basic" label="工事名" variant="outlined" />



<Autocomplete
    // multiple
    id="tags-standard"
    // options={top100Films}
    // getOptionLabel={(option) => option.title}
    // defaultValue={[top100Films[13]]}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        label="担当者"
        placeholder="Favorites"
      />
    )}
  />


<FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">契約金額</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        // value={values.amount}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="契約金額"
      />
    </FormControl>


    <TextField id="outlined-basic" label="坪数" variant="outlined" />


    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">坪単価</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        // value={values.amount}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="坪単価"
      />
    </FormControl>





    <Autocomplete
          // value={values}
          // onChange={handleChange}
          id="combo-box-demo"
          // options={}
          renderInput={(params) => (
            <TextField {...params} label="區" />
          )}
        />


<TextField id="outlined-basic" label="工期" variant="outlined" />




<TextField id="outlined-basic" label="開幕日" type="date"  InputLabelProps={{ shrink: true }}  variant="outlined" />




<div className="mainCompany">

<Autocomplete
    // multiple
    freeSolo
    id="tags-standard"
    // options={top100Films}
    // getOptionLabel={(option) => option.title}
    // defaultValue={[top100Films[13]]}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        label="分期"
        placeholder="50%"
      />
    )}
  />
</div>






<div className="secondaryCompany">

<Autocomplete
  disablePortal
  id="combo-box-demo"
  // options={}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="支払業者" />}
/>
<FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">支払金額</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        // value={values.amount}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="支払金額"
      />
    </FormControl>
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">減去金額</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        // value={values.amount}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="減去金額"
      />
    </FormControl>


</div>




      </Form>
    )}
  </Formik>
  )
}

export default AddTask