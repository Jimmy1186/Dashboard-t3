import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../../utils/trpc";

const initialValues = {
  userId: [],
};

const baseUser = z.object({
  id: z.string(),
});

export const addUserSchema = z.object({
  userId: z.array(baseUser),
});

export type addUserType = z.infer<typeof addUserSchema>;







type locationType = {
  errors: any,
  setFieldValue: (dataName: string, locationId: number) => void;
  setErrors: (location: object) => void;
};




function AddCharge({errors,setFieldValue,setErrors}:locationType) {
  const { data: users } = trpc.useQuery(["add.user"]);

  return (
    <>
      <h3>担当者</h3>

      {errors.userId}
      <Autocomplete
        multiple
        options={users || []}
        onChange={(_, value: any) => {
          let Uid = value.map((i: any) => {
            return { id: i.id };
          });

   
          try {
            setFieldValue("userId", Uid);
          } catch (e) {
            setErrors({
              userId: "一定要選",
            });
          }
        }}
        getOptionLabel={(option) => `${option.id}${option.username}`}
        renderOption={(props: any, option: any) => {
          return (
            <li
              {...props}
              className="autoList"
            >{`${option.id}:${option.username}`}</li>
          );
        }}
        renderInput={(params) => {
          return <TextField {...params} label="担当者" variant="outlined" />;
        }}
      />
    </>
  );
}

export default AddCharge;
