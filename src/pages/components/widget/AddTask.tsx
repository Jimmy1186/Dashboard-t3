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

          <TextField id="outlined-basic" label="工事名" variant="outlined" />

          <TextField id="outlined-basic" label="坪数" variant="outlined" />

          <InputLabel htmlFor="outlined-adornment-amount">坪単価</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // value={values.amount}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="坪単価"
          />
        </Form>
      )}
    </Formik>
  );
}

export default AddTask;
