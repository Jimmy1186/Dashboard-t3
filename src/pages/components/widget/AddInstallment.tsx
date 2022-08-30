import React, { useCallback } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputLabel, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
type taskType = {
  errors: any;
  handleChange: (props: any) => void;
  values: any;
  setFieldValue: any;
};

function AddInstallment({
  values,
  errors,
  handleChange,
  setFieldValue,
}: taskType) {
  return (
    <>
      <FieldArray
        name="percent"
        render={(arrayHelpers) => (
          <div>
            {values.percent && values.percent.length > 0 ? (
              values.percent.map((per: any, index: any) => (
                <div key={index}>
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
                      onClick={() => arrayHelpers.push({ rate: 0, ok: false })}
                    >
                      新增
                    </Button>
                  </ButtonGroup>
                  {/* <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ rate: 0, ok: false })}
                  >
                    +
                  </button> */}

                  <Field
                    as={FormControlLabel}
                    type="checkbox"
                    name={`percent.${index}.ok`}
                    control={<Checkbox />}
                    label="OK"
                  />

                  {/* <FormControlLabel
                  
                    control={
                      <Field type="checkbox"  name={`percent.${index}.ok`}  />
                    }
                    label="OK?"
                  /> */}
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
    </>
  );
}

export default AddInstallment;
