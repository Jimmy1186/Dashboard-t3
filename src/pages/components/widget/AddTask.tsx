import React from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { z } from "zod";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
import Head from "next/head";
import Button from "@mui/material/Button";
import AddLocation from "./AddLocation";




type taskType = {
  errors: any,
  setFieldValue: (dataName: string, data: Date) => void;
  handleChange:(props:any)=>void,
  values:any,
};

function AddTask({ errors, setFieldValue,handleChange,values }: taskType) {




  return (
    <>
    
          
          

            {errors.name}
            <TextField
              id="outlined-basic"
              name="task_name"
              label="工事名"
              onChange={handleChange}
              variant="outlined"
            />
            {errors.p}
            <TextField
              type="number"
              id="outlined-basic"
              name="p"
              label="坪数"
              onChange={handleChange}
              variant="outlined"
            />

            <InputLabel htmlFor="outlined-adornment-amount">坪単価</InputLabel>

            {errors.pValue}
            <OutlinedInput
              type="number"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              name="pValue"
            />

            {errors.startDate}
            <DatePicker
              selected={values.startDate}
              name="startDate"
              onChange={(date:any) => {
                setFieldValue("startDate", date);
              }}
            />

            {errors.endDate}
            <DatePicker
              selected={values.endDate}
              name="endDate"
              onChange={(date:any) => {
                setFieldValue("endDate", date);
              }}
            />

            {errors.open}
            <DatePicker
              selected={values.open}
              name="open"
              onChange={(date:any) => {
                setFieldValue("open", date);
              }}
            />

            {errors.createAt}
            <DatePicker
              selected={values.createAt}
              name="createAt"
              onChange={(date:any) => {
                setFieldValue("createAt", date);
              }}
            />


    </>
  );
}

export default AddTask;
