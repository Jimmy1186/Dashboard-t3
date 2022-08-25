import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

export const selectCompanySchema = z.object({
  companyId: z.number().min(1,"一定要選"),
  amount: z.number().min(1,"要大於1"),
  cutPayment: z.number().min(0),
});

export type selectCompanyType = z.infer<typeof selectCompanySchema>;

const initialValues = {
  companyId: 0,
  amount: 0,
  cutPayment: 0,
};

function AddPriOrSecCompany() {
  const { data: company } = trpc.useQuery(["add.findCompany"]);

  const sumbitHandler = (values: selectCompanyType, action: any) => {
    console.log(values);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(selectCompanySchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid, setFieldValue,setErrors }) => (
        <Form className="signupForm">
          <h3>新增公司</h3>
        {errors.companyId}
          <Autocomplete
            options={company || []}
            onChange={(_, value: any | null) => {
              
              console.log(value)
              try{
                 setFieldValue("companyId",   value.id!=null? value.id:initialValues.companyId);
              }catch(e){
                setErrors({
                    companyId:"一定要選"
                })
              }
             
            }}
            getOptionLabel={(option) => `${option.id}${option.name}`}
            renderOption={(props: any, option: any) => {
              return (
                <li
                  {...props}
                  className="autoList"
                >{`${option.id}:${option.name}`}</li>
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  value={values.companyId}
                  {...params}
                  label="選擇公司"
                  variant="outlined"
                />
              );
            }}
          />

          <InputLabel htmlFor="outlined-adornment-amount">契約金額</InputLabel>
          {errors.amount}
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="契約金額"
          />

          <InputLabel htmlFor="outlined-adornment-amount">扣除金額</InputLabel>
          <OutlinedInput
            name="cutPayment"
            type="number"
            id="outlined-adornment-amount"
            value={values.cutPayment}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">$ -</InputAdornment>
            }
            label="契約金額"
          />

          <Button variant="outlined" type="submit" disabled={!isValid}>
            存檔
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddPriOrSecCompany;
