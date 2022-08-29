import React, { useCallback } from "react";
import AddCharge from "../components/widget/AddCharge";
import AddCompony from "../components/widget/AddCompony";
import AddInstallment from "../components/widget/AddInstallment";
import AddLocation from "../components/widget/AddLocation";
import AddNote from "../components/widget/AddNote";
import AddPriOrSecCompany from "../components/widget/AddPriOrSecCompany";
import AddTask from "../components/widget/AddTask";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { z } from "zod";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
import Head from "next/head";
import Button from "@mui/material/Button";
import AddTaskBtn, { createTaskType } from "../components/tools/AddTaskBtn";
import { motion } from "framer-motion"
import { trpc } from "../../utils/trpc";


const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date().nullable(),
  location: z.number(),
});

export type taskType = z.infer<typeof taskSchema>;

const initialValues = {
  id: "",
  name: "",
  p: 0,
  pValue: 0,
  startDate: null,
  endDate: null,
  open: null,
  createAt: null,
  location: 0,
};

function index() {

  const createTaskMutation = trpc.useMutation(['add.create'])

  const onCreate = useCallback((values:createTaskType)=>{
createTaskMutation.mutate({
  id:values.id,
  name:values.name
})
  },[createTaskMutation])

  const sumbitHandler = (values: taskType, action: any) => {


    console.log(values);
  };



  return (
    <>
    

      <AddTaskBtn onCreateFn={onCreate}/>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(taskSchema)}
        onSubmit={sumbitHandler}
      >
        {({
          errors,
          setErrors,
          values,
          handleChange,
          setFieldValue,
          isValid,
        }) => (
             <motion.div 
    
             className="formWrapper">

             <Form className="signupForm">
            {/* <AddTask
              errors={errors}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              values={values}
            /> */}
            {/* <AddCharge /> */}
            {/* <AddPriOrSecCompany /> */}
            {/* <AddNote /> */}
            {/* <AddLocation
              errors={errors}
              setFieldValue={setFieldValue}
              setErrors={setErrors}
            /> */}

            {/* <Button variant="outlined" type="submit" disabled={!isValid}>
              存檔
            </Button> */}
            {/* <AddCompony />*/}
             {/* <AddInstallment />  */}
          </Form>
          </motion.div>
         
        )}
      </Formik>
    </>
  );
}

export default index;
