import React from "react";
import TextField from "@mui/material/TextField";
import { trpc } from "../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";

type locationType = {
  errors: any;
  setFieldValue: (i: string, j: number) => void;
  setErrors: (e: object) => void;
};
function AddLocation({ errors, setFieldValue, setErrors }: locationType) {
  const { data: lo} = trpc.useQuery(["add.location"]);

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
