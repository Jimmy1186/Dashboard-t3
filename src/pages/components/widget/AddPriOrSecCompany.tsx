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
  companyType: "secCompany" | "priCompany";
  errors: any;
  setFieldValue: (dataName: string, locationId: number) => void;
  setErrors: (location: object) => void;
  handleChange: (props: any) => void;
  values: any;
};

function AddPriOrSecCompany({
  companyType,
  errors,
  setFieldValue,
  setErrors,
  values,
  handleChange,
}: locationType) {
  const { data: company } = trpc.useQuery(["add.findCompany"]);


  if (companyType === "priCompany") {
    return (
      <>
        <Autocomplete
          options={company || []}
          onChange={(_, value: any | null) => {
            console.log(value);
            try {
              setFieldValue(`priCompany.companyId`, value.id);
            } catch (e) {
              setErrors({
                companyId: "一定要選",
              });
            }
          }}
          getOptionLabel={(option) => `${option.id}${option.name}`}
          renderOption={(props: any, option: any) => {
            return (
              <li
                {...props}
                className="autoList"
              >{`${option.id}:${option.name}`}</li>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                value={values.companyId}
                {...params}
                label="選擇公司"
                variant="outlined"
              />
            );
          }}
        />

        <InputLabel htmlFor="outlined-adornment">契約金額</InputLabel>
        {errors.amount}

        <OutlinedInput
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(`priCompany.amount`, Number(e.target.value));
          }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          name="amount"
        />

        <OutlinedInput
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(`priCompany.cutPayment`, Number(e.target.value));
          }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          name="cutPayment"
        />
        <TextField
        
          id="outlined-basic"
          label="備註"
          name={`priCompany.note`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(`priCompany.note`, e.target.value);
          }}
          variant="outlined"
        />
      </>
    );
  }
  return (
    <>
      <h3>"支払業者"</h3>

      {errors.companyId}
      <FieldArray
        name="secCompany"
        render={(arrayHelpers) => (
          <>
            {values.secCompany && values.secCompany.length > 0 ? (
              values.secCompany.map((per: any, index: any) => (
                <div key={index}>
                  <Autocomplete
                    options={company || []}
                    onChange={(_, value: any | null) => {
                      console.log(value);
                      try {
                        setFieldValue(
                          `secCompany.${index}.companyId`,
                          value.id
                        );
                      } catch (e) {
                        setErrors({
                          companyId: "一定要選",
                        });
                      }
                    }}
                    getOptionLabel={(option) => `${option.id}${option.name}`}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          className="autoList"
                        >{`${option.id}:${option.name}`}</li>
                      );
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          value={`secCompany.${index}.companyId`}
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
                    name={`secCompany.${index}.amount`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        `secCompany.${index}.amount`,
                        Number(e.target.value)
                      );
                    }}
                  />

                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name={`secCompany.${index}.cutPayment`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        `secCompany.${index}.cutPayment`,
                        Number(e.target.value)
                      );
                    }}
                  />

                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      type="button"
                      startIcon={<DeleteIcon />}
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      刪除
                    </Button>
                    <Button
                      type="button"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        arrayHelpers.push({
                          amount: 0,
                          cutPayment: 0,
                          note: "",
                        })
                      }
                    >
                      新增
                    </Button>
                  </ButtonGroup>

                  <TextField
                    id="outlined-basic"
                    label="備註"
                    name={`secCompany.${index}.note`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(`secCompany.${index}.note`, e.target.value);
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
