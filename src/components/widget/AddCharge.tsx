import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { trpc } from "../../utils/trpc";
import { taskType } from "../../types/task";
import LinearProgress from '@mui/material/LinearProgress';
type locationType = {
  values: taskType;
  coe: boolean;
  errors: any;
  setFieldValue: (i: string, j: number) => void;
  setErrors: (e: object) => void;
};

function AddCharge({
  errors,
  setFieldValue,
  setErrors,
  values,
  coe,
}: locationType) {
  const { data, isLoading } = trpc.useQuery(["add.user"]);

  if (values.charges === undefined && coe === false) {
    return <LinearProgress />
  }

  if (isLoading) {
    return <LinearProgress />
  }
  return (
    <>
      <div className="bgPaper flex flex-col gap-4">
        <h3>担当者</h3>

        {errors.charges}
        <Autocomplete
          multiple
          value={values.charges}
          isOptionEqualToValue={(option, value) => {
            return option.users.id === value.users.id;
          }}
          options={data || []}
          onChange={(_, value: any) => {

            try {
              setFieldValue("charges", value);
            } catch (e) {
              setErrors({
                charge: "一定要選",
              });
            }
          }}
          getOptionLabel={(option: any) =>
            `${option.users.id}${option.users.username}`
          }
          renderOption={(props: any, option: any) => {
            return (
              <p
                {...props}
                className="autoList"
              >{`${option.users.id}:${option.users.username}`}</p>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} label="担当者" variant="outlined" />;
          }}
        />
      </div>
    </>
  );
}

export default AddCharge;
