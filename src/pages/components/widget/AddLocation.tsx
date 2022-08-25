import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";



export const locationSchema = z.object({
  id: z.number(),
});
export type locationType = z.infer<typeof locationSchema>;
type locationsType = {
  id: number;
};

function AddLocation() {
  const [inputValue, setInputValue] = React.useState();

  const { data: lo, isLoading } = trpc.useQuery(["add.location", inputValue]);

  const initialValues = {
    id: 0,
  };


  const sumbitHandler = (values: locationType, action: any) => {
    console.log(values);
    action.resetForm();
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(locationSchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid, setFieldValue,setErrors }) => (
        <Form className="signupForm">
          <h3>新增公司</h3>

          {errors.id}
          <Autocomplete
            id="id"
            options={lo || []}
            onChange={(_, value: any) => {
              // console.log(value)
              try{
                setFieldValue("companyId",   value.id!=null? value.id:initialValues.id);
             }catch(e){
               setErrors({
                   id:"一定要選"
               })
             }
            }}
            getOptionLabel={(option) => `${option.id}${option.location}`}
            renderOption={(props: any, option: any) => {
              return (
                <li
                  {...props}
                  className="autoList"
                >{`${option.id}:${option.location}`}</li>
              );
            }}
            renderInput={(params) => {
              return (
                <TextField {...params} label="Combo box" variant="outlined" />
              );
            }}
          />

          <Button variant="outlined" type="submit" disabled={!isValid}>
            存檔
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddLocation;
