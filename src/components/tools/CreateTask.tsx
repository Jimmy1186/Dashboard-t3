import React from "react";
import AddCharge from "../../components/widget/AddCharge";
import AddInstallment from "../../components/widget/AddInstallment";
import AddLocation from "../../components/widget/AddLocation";
import AddPriOrSecCompany from "../../components/widget/AddPriOrSecCompany";
import AddTask from "../../components/widget/AddTask";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import { taskSchema, taskType } from "../../types/task";
import Dialog from "@mui/material/Dialog";



type createTaskType = {
  coe:boolean,
  initialValues: taskType;
  open: boolean;
  setOpen: (i: boolean) => void;
  onAll: (v: any) => void;
  onEdit: (v: any) => void;
};

function CreateTask({ open, setOpen, onAll,onEdit, initialValues,coe }: createTaskType) {
  const handleClose = () => {
    setOpen(false);
  };

  const sumbitHandler = (values: taskType, action: any) => {
    
    coe?onAll(values):onEdit(values)
   
    action.resetForm();
  };

  return (
    <Formik
      enableReinitialize={true}
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
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth="lg"
        >
          <motion.div className="formWrapper">
            <Form className="signupForm">
              <h2>編輯表單</h2>
              <AddTask
                coe={coe}
                errors={errors}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                values={values}
              />
              <AddCharge
              coe={coe}
               values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
              />

              <AddPriOrSecCompany
                     coe={coe}
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
                values={values}
              />

              <AddLocation
              coe={coe}
               values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
              />
              <AddInstallment
                        coe={coe}
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
              />
              <div className="bgPaper createTaskBox">
                <Button onClick={handleClose}>取消</Button>
                <Button variant="outlined" type="submit" disabled={!isValid}>
                  存檔
                </Button>
              </div>
            </Form>
          </motion.div>
        </Dialog>
      )}
    </Formik>
  );
}

export default CreateTask;
