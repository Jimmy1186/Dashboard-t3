import React, { useCallback, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { trpc } from "../../utils/trpc";
import { taskType } from "../../types/task";

type locationType = {
  values: any;
  errors: any;
  setFieldValue: (i: string, j: number) => void;
  setErrors: (e: object) => void;
};

function AddCharge({ errors, setFieldValue, setErrors, values }: locationType) {
  const { data: users } = trpc.useQuery(["add.user"]);
  const [pl, setPl] = useState();



 useEffect(()=>{
 if (values.charges != undefined) {
    const p=values.charges.map((i: any) => {
      return { id: i.users.id, username: i.users.username };
    });
    setPl(pl)
  }
 },[])




  // console.log(values)
  return (
    <>
      <div className="bgPaper">
        <h3>担当者</h3>

        {errors.charge}
        <Autocomplete
          multiple
      
          isOptionEqualToValue={(option, value) => false}
          //  isOptionEqualToValue={(option, value) =>{
          //   // console.log("option :"+option)
          //   // console.log("value :"+value)
          //   // console.log(option === value)
          //   return true
          //  }}
          options={users || []}
          defaultValue={pl}
          onChange={(_, value: any) => {
            console.log(value);
            const Uid = value.map((i: any) => {
              return { userId: i.id };
            });

            try {
              setFieldValue("charge", Uid);
              console.log(values);
            } catch (e) {
              setErrors({
                charge: "一定要選",
              });
            }
          }}
          getOptionLabel={(option: any) => `${option.id}${option.username}`}
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
