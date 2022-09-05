import React from "react";
import {  FieldArray } from "formik";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import { trpc } from "../../utils/trpc";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { taskType } from "../../types/task";

export const selectCompanySchema = z.object({
  companyId: z.number().min(1, "一定要選"),
  amount: z.number().min(1, "要大於1"),
  cutPayment: z.number().min(0),
});

export type selectCompanyType = z.infer<typeof selectCompanySchema>;

type locationType = {
  errors: any;
  setFieldValue: (i: string, j: number | string) => void;
  setErrors: (i: object) => void;
  values: any;
};

function AddPriOrSecCompany({
  errors,
  setFieldValue,
  setErrors,
  values,
}: locationType) {
  const { data: company } = trpc.useQuery(["add.findCompany"]);

 
  return (
    <div className="bgPaper inputWrapper">
     

      {errors.companyId}
      <FieldArray
        name="companyType"
        validateOnChange={false}
        render={(arrayHelpers) => (
          <>
            {values.companyType && values.companyType.length > 0 ? (
              values.companyType.map((per: any, index: number) => (
                <div key={index} className="selectCompany">
                  <div className="inputBox">
                  <h3>契約公司</h3>
                    <Autocomplete
                      options={company || []}
                      onChange={(_, value: any ) => {
                        try {
                          setFieldValue(
                            `companyType.${index}.companyId`,
                            value.id
                          );
                          {
                            index != 0
                              ? setFieldValue(
                                  `companyType.${index}.c_Type`,
                                  "sec"
                                )
                              : setFieldValue(
                                  `companyType.${index}.c_Type`,
                                  "pri"
                                );
                          }
                        } catch (e) {
                          setErrors({
                            companyId: "一定要選",
                          });
                        }
                      }}
                      getOptionLabel={(option) =>
                        `${option.id}${option.c_name}`
                      }
                      renderOption={(props: any, option: any) => {
                        return (
                          <p {...props}>{`${option.id}:${option.c_name}`}</p>
                        );
                      }}
                      renderInput={(params) => {
                        return (
                          <TextField
                            value={`companyType.${index}.companyId`}
                            {...params}
                            label="選擇公司"
                            variant="outlined"
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="inputBox">
                    <h3>金額</h3>
                    <OutlinedInput
                     fullWidth
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      name={`companyType.${index}.amount`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          `companyType.${index}.amount`,
                          Number(e.target.value)
                        );
                      }}
                    />
                  </div>

                  <div className="inputBox">
                    <h3>扣除金額</h3>
                    <OutlinedInput
                     fullWidth
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      name={`companyType.${index}.cutPayment`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          `companyType.${index}.cutPayment`,
                          Number(e.target.value)
                        );
                      }}
                    />
                  </div>
                  <div className="inputBox">
                    <h3>備註</h3>
                    <TextField
                    fullWidth
                      id="outlined-basic"
                      label="備註"
                      name={`companyType.${index}.notes`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          `companyType.${index}.notes`,
                          e.target.value
                        );
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div className="inputBox selectCompanyBtn">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
            
                      {values.companyType[index].c_Type === "pri" ? (
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
                            c_Type: "sec",
                            companyId: 0,
                            amount: 0,
                            cutPayment: 0,
                            note: null,
                          })
                        }
                      >
                        新增支払業者
                      </Button>
                    </ButtonGroup>
                  </div>
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
    </div>
  );
}

export default AddPriOrSecCompany;
