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
type taskType = {
  errors: any;
  values: any;
  setFieldValue: any;
};

function AddInstallment({
  values,
  errors,
  setFieldValue,
}: taskType) {
  return (
    <>
      <div className="bgPaper ">
      <h3>分期</h3>
      <p className="errormsg">{errors.installment}</p>
        <FieldArray
          name="percent"
          render={(arrayHelpers) => (
            <div>
              {values.percent && values.percent.length > 0 ? (
                values.percent.map((per: any, index: any) => (
                  <div key={index}>
                    <div className="inputBox">
                   
                      <OutlinedInput
                        startAdornment={
                          <InputAdornment position="end">%</InputAdornment>
                        }
                        name={`percent.${index}.rate`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(
                            `percent.${index}.rate`,
                            Number(e.target.value)
                          );
                        }}
                      />
                    </div>

                    <div className="inputBox">
                      <Field
                        as={FormControlLabel}
                        type="checkbox"
                        name={`percent.${index}.ok`}
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
                            arrayHelpers.push({ rate: 0, ok: false })
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
                  Add a percent
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
