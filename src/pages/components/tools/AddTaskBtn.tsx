import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@mui/material/Button";
import { AddLocation } from "@mui/icons-material";
import { useRouter } from "next/router";



export const createTaskSchena = z.object({
  id: z.string(),
  name: z.string(),
});

export type createTaskType = z.infer<typeof createTaskSchena>;

const initialValues = {
  id: "",
  name: "",
};

export type createBtnType ={
  onCreateFn:(values:createTaskType)=>void
}

function AddTaskBtn({onCreateFn}:createBtnType) {

  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()




  const sumbitHandler = (values: createTaskType, action: any) => {
    onCreateFn(values)
    action.resetForm();
    router.push(`${router.pathname}/${values.id}`)
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      {isVisible && (
        <motion.div
          className="createTask"
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
                <TextField
                  label="NO"
                  name="id"
                  value={values.id}
                  onChange={handleChange}
                  variant="outlined"
                />

                <TextField
                  label="工事名"
                  name="name"
                  value={values.name}
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
