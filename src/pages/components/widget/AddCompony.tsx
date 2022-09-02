import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { companySchema, companyType } from "../../../types/common";
import { trpc } from "../../../utils/trpc";
import CloseIcon from "@mui/icons-material/Close";






  const initialValues = {
    c_name: "",
    c_title: "",
    c_tax: "",
  };

type toggleCompanyType = {
  companyToggle:boolean,
  setCompanyToggle:(toggle:boolean)=>void
}



function AddCompony( {setCompanyToggle,companyToggle}:toggleCompanyType) {


  const addCompanyMutation = trpc.useMutation(["add.company"]);

  const onAddCompany = useCallback(
    ({ c_name, c_title, c_tax }: companyType) => {
      addCompanyMutation.mutate({
        c_name,
        c_title,
        c_tax,
      });
    },
    [addCompanyMutation]
  );

  const sumbitHandler = (values: companyType,action:any) => {
    onAddCompany(values);
    action.resetForm();
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
          <Button
            type="button"
            startIcon={<CloseIcon />}
            onClick={() => setCompanyToggle(!companyToggle)}
          ></Button>
          {addCompanyMutation.data?.msg}
          {errors.c_name}
          <TextField
            id="outlined-basic"
            label="公司名稱"
            name="c_name"
            value={values.c_name}
            onChange={handleChange}
            variant="outlined"
          />

          {errors.c_title}
          <TextField
            id="outlined-basic"
            label="公司抬頭"
            name="c_title"
            value={values.c_title}
            onChange={handleChange}
            variant="outlined"
          />

          {errors.c_tax}
          <TextField
            id="outlined-basic"
            label="統編"
            name="c_tax"
            value={values.c_tax}
            onChange={handleChange}
          />

          <Button variant="outlined" type="submit" disabled={!isValid}>
            存檔
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddCompony;
