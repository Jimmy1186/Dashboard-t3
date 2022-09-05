import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { trpc } from "../../utils/trpc";


type locationType = {
  errors: any;
  setFieldValue: (i: string, j: number) => void;
  setErrors: (e: object) => void;
};

function AddCharge({ errors, setFieldValue, setErrors }: locationType) {
  const { data: users } = trpc.useQuery(["add.user"]);

  return (
    <>
      <div className="bgPaper">
        <h3>担当者</h3>

        {errors.charge}
        <Autocomplete
          multiple
          options={users || []}
          onChange={(_, value: any) => {
            const Uid = value.map((i: any) => {
              return { userId: i.id };
            });

            try {
              setFieldValue("charge", Uid);
            } catch (e) {
              setErrors({
                charge: "一定要選",
              });
            }
          }}
          getOptionLabel={(option) => `${option.id}${option.username}`}
          renderOption={(props: any, option: any) => {
            return (
              <p
                {...props}
                className="autoList"
              >{`${option.id}:${option.username}`}</p>
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
