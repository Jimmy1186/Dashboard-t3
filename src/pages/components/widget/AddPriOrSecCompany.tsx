import React, { useCallback } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const selectCompanySchema = z.object({
  companyId: z.number().min(1, "一定要選"),
  amount: z.number().min(1, "要大於1"),
  cutPayment: z.number().min(0),
});

export type selectCompanyType = z.infer<typeof selectCompanySchema>;

type locationType = {
  errors: any;
  setFieldValue: (dataName: string, v: number | string) => void;
  setErrors: (location: object) => void;
  handleChange: (props: any) => void;
  values: any;
};

function AddPriOrSecCompany({
  errors,
  setFieldValue,
  setErrors,
  values,
  handleChange,
}: locationType) {
  const { data: company } = trpc.useQuery(["add.findCompany"]);

  return (
    <>
      <h3>"支払業者"</h3>

      {errors.companyId}
      <FieldArray
        name="companyTypes"
        validateOnChange={false}
        render={(arrayHelpers) => (
          <>
            {values.companyTypes && values.companyTypes.length > 0 ? (
              values.companyTypes.map((per: any, index: any) => (
                <div key={index}>
                  <Autocomplete
                    options={company || []}
                    onChange={(_, value: any | null) => {
                      try {
                        setFieldValue(
                          `companyTypes.${index}.companyId`,
                          value.id
                        );
                      } catch (e) {
                        setErrors({
                          companyId: "一定要選",
                        });
                      }
                    }}
                    getOptionLabel={(option) => `${option.id}${option.c_name}`}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          className="autoList"
                        >{`${option.id}:${option.c_name}`}</li>
                      );
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          value={`companyTypes.${index}.companyId`}
                          {...params}
                          label="選擇公司"
                          variant="outlined"
                        />
                      );
                    }}
                  />

                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name={`companyTypes.${index}.amount`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        `companyTypes.${index}.amount`,
                        Number(e.target.value)
                      );
                    }}
                  />

                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name={`companyTypes.${index}.cutPayment`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        `companyTypes.${index}.cutPayment`,
                        Number(e.target.value)
                      );
                    }}
                  />

                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    {values.companyTypes[index].companyType === "pri" ? (
                      ""
                    ) : (
                      <Button
                        type="button"
                        startIcon={<DeleteIcon />}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        刪除
                      </Button>
                    )}

                    <Button
                      type="button"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        arrayHelpers.push({
                          companyTypes: "sec",
                          amount: 0,
                          cutPayment: 0,
                          note: null,
                        })
                      }
                    >
                      新增
                    </Button>
                  </ButtonGroup>

                  <TextField
                    id="outlined-basic"
                    label="備註"
                    name={`companyTypes.${index}.note`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        `companyTypes.${index}.note`,
                        e.target.value
                      );
                    }}
                    variant="outlined"
                  />
                </div>
              ))
            ) : (
              <Button
                type="button"
                startIcon={<AddIcon />}
                onClick={() => arrayHelpers.push("")}
              >
                {/* show this when user has removed all friends from the list */}
                Add a percent
              </Button>
            )}
          </>
        )}
      />
    </>
  );
}

export default AddPriOrSecCompany;
