import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Button from "@mui/material/Button";

export const noteSchema = z.object({
  note: z.string(),
  // primaryCompays:z.number(),
  // secondaryCompanys:z.number(),
});

export type noteType = z.infer<typeof noteSchema>;

function AddNote() {
  const initialValues = {
    note: "",
    // primaryCompays: 0,
    // secondaryCompanys: 0,
  };

  const sumbitHandler = (values: noteType, action: any) => {
    console.log(values);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(noteSchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid }) => (
        <Form className="signupForm">
          <h3>備註</h3>
          {/* {addCompanyMutation.data?.msg}
        {errors.name} */}
          <TextField
            id="outlined-basic"
            label="備註"
            name="note"
            value={values.note}
            onChange={handleChange}
            variant="outlined"
          />

          <Button variant="outlined" type="submit" disabled={!isValid}>
            存檔
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddNote;
