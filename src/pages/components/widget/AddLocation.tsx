import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";

type locationType = {
  errors: any;
  setFieldValue: (dataName: string, locationId: number) => void;
  setErrors: (location: object) => void;
};
function AddLocation({ errors, setFieldValue, setErrors }: locationType) {
  const { data: lo, isLoading } = trpc.useQuery(["add.location"]);

  return (
    <>
      <div className="bgPaper ">
        <h3>地區</h3>

        {errors?.location}
        <Autocomplete
          id="id"
          options={lo || []}
          onChange={(_, value: any) => {
            try {
              setFieldValue("locationId", value.id);
              // setFieldValue("location",   value.id!=null? value.id:initialValues.location);
            } catch (e) {
              setErrors({
                location: "一定要選",
              });
            }
          }}
          getOptionLabel={(option) => `${option.id}${option.location_name}`}
          renderOption={(props: any, option: any) => {
            return (
              <li
                {...props}
                className="autoList"
              >{`${option.id}:${option.location_name}`}</li>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} label="綠島" variant="outlined" />;
          }}
        />
      </div>
    </>
  );
}

export default AddLocation;
