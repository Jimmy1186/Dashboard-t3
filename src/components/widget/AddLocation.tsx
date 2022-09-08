import React from "react";
import TextField from "@mui/material/TextField";
import { trpc } from "../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";
import { taskType } from "../../types/task";

type locationType = {
  values:taskType,
  coe: boolean,
  errors: any;
  setFieldValue: (i: string, j: number) => void;
  setErrors: (e: object) => void;
};
function AddLocation({ errors, setFieldValue, setErrors,values,coe }: locationType) {
  const { data: lo,isLoading} = trpc.useQuery(["add.location"]);


// console.log(values)
if (values.locations === undefined && coe === false) {
  return <>loading</>;
}
if (isLoading) {
  return <>isloading</>;
}
  return (
    <>
      <div className="bgPaper ">
        <h3>地區</h3>

        {errors.location}
        <Autocomplete
          id="id"
          value={values.locations}
          options={lo || []}
          isOptionEqualToValue={(option, value) => {
  
            return option.id === value.id;
          }}
          onChange={(_, value: any) => {
            try {
              setFieldValue("locations", value);
          
            } catch (e) {
              setErrors({
                location: "一定要選",
              });
            }
          }}
          getOptionLabel={(option) => `${option.id}${option.location_name}`}
          renderOption={(props: any, option: any) => {
            return (
              <p
                {...props}
                className="autoList"
              >{`${option.id}:${option.location_name}`}</p>
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
