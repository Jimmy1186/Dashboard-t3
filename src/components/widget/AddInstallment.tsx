import React from "react";
import { FieldArray, Field } from "formik";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { taskType } from "../../types/task";
type iType = {
  errors: any;
  values: taskType;
  setFieldValue: (i: string, j: number) => void;
};

function AddInstallment({
  values,
  errors,
  setFieldValue,
}: iType) {
  return (
    <>
      <div className="bgPaper ">
      <h3>分期</h3>
      <p className="errormsg">{errors.installment}</p>
        <FieldArray
          name="installment"
          render={(arrayHelpers) => (
            <div>
              {values.installment && values.installment.length > 0 ? (
                values.installment.map((per: any, index: number) => (
                  <div key={index}>
                    <div className="inputBox">
                   
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment position="end">%</InputAdornment>
                        }
                        name={`installment.${index}.percent`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(
                            `installment.${index}.percent`,
                            Number(e.target.value)
                          );
                        }}
                      />
                    </div>

                    <div className="inputBox">
                      <Field
                        as={FormControlLabel}
                        type="checkbox"
                        name={`installment.${index}.ok`}
                        control={<Checkbox />}
                        label="OK"
                      />
                    </div>

                    <div className="inputBox selectCompanyBtn">
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
                            arrayHelpers.push({ percent: 0, ok: false })
                          }
                        >
                          新增
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
                  Add a installment
                </Button>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}

export default AddInstallment;
