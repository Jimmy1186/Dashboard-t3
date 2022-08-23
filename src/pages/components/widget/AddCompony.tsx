import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from '@mui/material/Button';
import { companySchema, companyType } from "../../../types/common";
import { trpc } from "../../../utils/trpc";




function AddCompony() {
  const initialValues = {
    name: "",
    title: "",
    tax: "",
  };

  const addCompanyMutation = trpc.useMutation(['add.company'])

  const onAddCompany = useCallback(({name,title,tax}:companyType)=>{
    addCompanyMutation.mutate({
        name,
        title,
        tax
    })
  },[addCompanyMutation])


  const sumbitHandler = (values: companyType) => {
    onAddCompany(values)
    // action.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(companySchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid }) => (
        <Form className="signupForm">
            <h3>新增公司</h3>
            {addCompanyMutation.data?.msg}
            {errors.name}
          <TextField
            id="outlined-basic"
            label="公司名稱"
            name="name"
            value={values.name}
            onChange={handleChange}
            variant="outlined"
          />


{errors.title}
          <TextField
            id="outlined-basic"
            label="公司抬頭"
            name="title"
            value={values.title}
            onChange={handleChange}
            variant="outlined"
          />

          
{errors.tax}
          <TextField
            id="outlined-basic"
            label="統編"
            name="tax"
            value={values.tax}
            onChange={handleChange}
         
          />

        <Button variant="outlined" type="submit">存檔</Button>

        </Form>
      )}
    </Formik>
  );
}

export default AddCompony;
