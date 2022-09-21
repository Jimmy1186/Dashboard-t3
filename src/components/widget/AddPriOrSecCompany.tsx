import React from "react";
import { FieldArray } from "formik";
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
import LinearProgress from '@mui/material/LinearProgress';
export const selectCompanySchema = z.object({
  companyId: z.number().min(1, "一定要選"),
  amount: z.number().min(1, "要大於1"),
  cutPayment: z.number().min(0),
});

export type selectCompanyType = z.infer<typeof selectCompanySchema>;

type locationType = {
  coe: boolean;
  errors: any;
  setFieldValue: (i: string, j: number | string) => void;
  setErrors: (i: object) => void;
  values: taskType;
};

function AddPriOrSecCompany({
  coe,
  errors,
  setFieldValue,
  setErrors,
  values,
}: locationType) {
  const { data: company, isLoading } = trpc.useQuery(["add.findCompany"]);

  // console.log(values.companyTypes)

  if (values.companyTypes === undefined && coe === false) {
    return    <LinearProgress />
  }

  if (isLoading) {
    return    <LinearProgress />
  }
  return (
    <div className="bgPaper flex flex-col gap-4">
      <FieldArray
        name="companyTypes"
        validateOnChange={false}
        render={(arrayHelpers) => (
          <>
            {values.companyTypes && values.companyTypes.length > 0 ? (
              values.companyTypes.map((per: any, index: number) => (
                <div key={index} className="selectCompany">
                  <div className="inputBox flex flex-col gap-4">
                    <h3>契約公司</h3>
                    {/* <p className="errormsg">{errors.companyTypes[index]?.company.}</p> */}
                    <Autocomplete
                      isOptionEqualToValue={(option, value) =>
                        value.c_tax === option.c_tax
                      }
                      options={company || []}
                      value={values.companyTypes[index]?.company}
                      onChange={(_, value: any) => {
                        try {
                          setFieldValue(`companyTypes.${index}.company`, value);

                          {
                            index != 0
                              ? setFieldValue(
                                  `companyTypes.${index}.c_Type`,
                                  "sec"
                                )
                              : setFieldValue(
                                  `companyTypes.${index}.c_Type`,
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
                            value={`companyTypes.${index}.company`}
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
                      value={values.companyTypes[index]?.amount || 0}
                      fullWidth
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
                  </div>

                  <div className="inputBox">
                    <h3>扣除金額</h3>
                    <OutlinedInput
                      value={values.companyTypes[index]?.cutPayment || 0}
                      fullWidth
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
                  </div>
                  <div className="inputBox">
                    <h3>備註</h3>
                    {errors.companyTypes != undefined ? (
                      <p className="errormsg">
                        {errors.companyTypes[index] != undefined
                          ? "填一下"
                          : ""}
                      </p>
                    ) : (
                      ""
                    )}

                    <TextField
                      fullWidth
                      value={values.companyTypes[index]?.notes || ""}
                      id="outlined-basic"
                      label="備註"
                      name={`companyTypes.${index}.notes`}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(
                          `companyTypes.${index}.notes`,
                          e.target.value
                        );
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div className="">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      {values.companyTypes[index]?.c_Type === "pri" ? (
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
                            company: {
                              id: 1,
                              c_name: "聚思怡",
                              c_title: "台灣聚思怡股份有限公司",
                              c_tax: "90443462",
                            },
                            amount: 0,
                            cutPayment: 0,
                            notes: null,
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
