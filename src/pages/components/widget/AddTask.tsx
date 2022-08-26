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

const taskSchema = z.object({
  numero: z.string(),
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date().nullable(),
});

export type taskType = z.infer<typeof taskSchema>;

function AddTask() {
  const initialValues = {
    numero: "",
    name: "",
    p: 0,
    pValue: 0,
    startDate: null,
    endDate: null,
    open: null,
    createAt: null,
  };

  const sumbitHandler = (values: taskType, action: any) => {

    console.log(values);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
        />
      </Head>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(taskSchema)}
        onSubmit={sumbitHandler}
      >
        {({ errors, values, handleChange, setFieldValue, isValid }) => (


          <Form className="signupForm">
            {/* {errors? (console.log(errors)):("")} */}
            {errors.numero}
            <TextField
            onChange={handleChange}
              name="numero"
              label="NO."
              variant="outlined"
            />

            {errors.name}
            <TextField
              id="outlined-basic"
              name="name"
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
              onChange={(date) => {
            
                setFieldValue("startDate", date);
              }}
            />

            {errors.endDate}
            <DatePicker
              selected={values.endDate}
              name="endDate"
              onChange={(date) => {
   
                setFieldValue("endDate", date);
              }}
            />

            {errors.open}
            <DatePicker
              selected={values.open}
              name="open"
              onChange={(date) => {
        
                setFieldValue("open", date);
              }}
            />

            {errors.createAt}
            <DatePicker
              selected={values.createAt}
              name="createAt"
              onChange={(date) => {

                setFieldValue("createAt", date);
              }}
            />
                <Button variant="outlined" type="submit" disabled={!isValid}>
              存檔
            </Button>
      
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddTask;
