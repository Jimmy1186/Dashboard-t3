import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputLabel, OutlinedInput } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

export const installmentSchena = z.object({
    percent:z.number()
    .min(1,"最小1")
    .max(99,"對大99"),
    ok:z.boolean()
})

export type installmentType =z.infer<typeof installmentSchena>

function AddInstallment() {








const initialValues = {
    percent: 0,
    ok: false,
  };


    const sumbitHandler = (values:installmentType ,action:any) => {
  console.log(values)
        action.resetForm();
      };



  return (
    <Formik
    initialValues={initialValues}
    validationSchema={toFormikValidationSchema(installmentSchena)}
    onSubmit={sumbitHandler}
  >
    {({ errors, values, handleChange, isValid }) => (
      <Form className="signupForm">
        <h3>分期</h3>
        {/* {addCompanyMutation.data?.msg} */}
        {errors.percent}

        <InputLabel htmlFor="percent">分期數</InputLabel>
        <OutlinedInput
            type="number"
       
          name="percent"
          value={values.percent}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />

        {errors.ok}
        <FormControlLabel control={<Checkbox />} label="OK?" />

 


        <Button variant="outlined" type="submit" disabled={!isValid}>
          存檔
        </Button>
      </Form>
    )}
  </Formik>
  )
}

export default AddInstallment