import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export const createTaskSchena = z.object({
  id: z.string()
  .min(6,"六個字元 範例'22001'")
  .max(6,"超過了")
  .regex(new RegExp("^[0-9-]+$"), "只能數字")
  .regex(new RegExp(".*[-].*"), "需要'-'")
 
});

export type createTaskType = z.infer<typeof createTaskSchena>;

const initialValues = {
  id: "",
};

export type createBtnType = {
  onCreateFn: (values: createTaskType) => void;
};

function AddTaskBtn({ onCreateFn }: createBtnType) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const sumbitHandler = (values: createTaskType, action: any) => {
    onCreateFn(values);
    action.resetForm();
    router.push(`${router.pathname}/${values.id}`);
  };

  
  return (
    <>
  <div className="addTaskBtn" onClick={() => setIsVisible(!isVisible)}>
      <svg className="addTaskSvg" viewBox="0 0 24 24">
    <path className="addTaskSvgPath" fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
</svg>
      </div>

      {isVisible && (
        <motion.div
          className="bgPaper createTask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(createTaskSchena)}
            onSubmit={sumbitHandler}
          >
            {({ errors, values, handleChange, isValid }) => (
              <Form className="signupForm">
                <span className="errormsg">{errors.id}</span>
                
                <TextField
                  label="NO"
                  name="id"
                  value={values.id}
                  onChange={handleChange}
                  variant="outlined"
                />

                <Button variant="outlined" type="submit" disabled={!isValid}>
                  存檔
                </Button>
              </Form>
            )}
          </Formik>
        </motion.div>
      )}
    </>
  );
}

export default AddTaskBtn;
