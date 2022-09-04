import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

const baseUser = z.object({
  id: z.string(),
});

export const addUserSchema = z.object({
  userId: z.array(baseUser),
});

export type addUserType = z.infer<typeof addUserSchema>;

type locationType = {
  errors: any;
  setFieldValue: (dataName: string, locationId: number) => void;
  setErrors: (location: object) => void;
};

function AddCharge({ errors, setFieldValue, setErrors }: locationType) {
  const { data: users } = trpc.useQuery(["add.user"]);

  return (
    <>
      <div className="bgPaper">
        <h3>担当者</h3>

        {errors.userId}
        <Autocomplete
          multiple
          options={users || []}
          onChange={(_, value: any) => {
            const Uid = value.map((i: any) => {
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
