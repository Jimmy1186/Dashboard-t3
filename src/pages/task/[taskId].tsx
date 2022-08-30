import React, { useCallback, useState } from "react";
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
import { motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useSession } from "next-auth/react";

const taskSchema = z.object({
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date().nullable(),
  locationId: z.number(),
  userId: z.array(
    z.object({
      id: z.string(),
    })
  ),

  percent: z.array(
    z.object({
      rate: z.number(),
      ok: z.boolean(),
    })
  ),
});

export type taskType = z.infer<typeof taskSchema>;


const initialValues = {
  name: "",
  p: 0,
  pValue: 0,
  startDate: null,
  endDate: null,
  open: null,
  createAt: null,
  locationId: 0,
  userId: [],
  percent: [
    {
      rate: 0,
      ok: false,
    },
  ],
};

function taskId() {

  const router = useRouter();
  const taskId = router.query.taskId as string;
  const [count, setCount] = useState(0);
  const { data: session } = useSession();

  const {data:task,refetch} = trpc.useQuery(['add.findOneTask',{taskId:taskId}])
  const taskMutation = trpc.useMutation(["add.task"]);
  const chargeMutation = trpc.useMutation(["add.charge"]);
  const historyMutation = trpc.useMutation(["add.history"]);
  const installmentMutation = trpc.useMutation(["add.installment"]);

console.log(task)

  const onInstallment = useCallback(
    (values: taskType) => {
   

      installmentMutation.mutate({
        taskId: taskId as string,
        percent:values.percent
      });
    },
    [installmentMutation]
  );

  const onHistory = useCallback( () => {
 
    historyMutation.mutate({
      userId: session?.id as string,
      taskId: taskId as string,
    });
  }, [historyMutation]);

  const onCreateCharge = useCallback(
     (values: taskType) => {
    
      chargeMutation.mutate({
        userId: values.userId,
        taskId: taskId as string,
      });
    },
    [chargeMutation]
  );

  const onUpdateTask = useCallback(
    async (values: taskType) => {
      const {
        name,
        p,
        pValue,
        startDate,
        endDate,
        open,
        createAt,
        locationId,
      } = values;
      if (
        startDate === null ||
        endDate === null ||
        open === null ||
        createAt === null
      ) {
        console.log("date cant be null");
        return;
      }
      const taskId = await router.query.taskId;
      taskMutation.mutate({
        id: taskId as string,
        name: name,
        p: p,
        pValue: pValue,
        startDate: startDate,
        endDate: endDate,
        open: open,
        createAt: createAt,
        locationId: locationId,
      });
    },
    [taskMutation]
  );

  const sumbitHandler = (values: taskType, action: any) => {
    onInstallment(values)
    // onHistory();
    // onCreateCharge(values);
    // onUpdateTask(values);
    console.log(values);
  };

  return (
    <>
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
          <motion.div className="formWrapper">
            <Form className="signupForm">
              <AddTask
                errors={errors}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                values={values}
              />
              <AddCharge
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
              />

              {/* <AddPriOrSecCompany
                companyType="pri"
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
                handleChange={handleChange}
                values={values}
              /> */}
              <AddLocation
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
              />
              <AddInstallment
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
              {/* <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon />
              </Fab>
              {[...Array(count)].map((_, i) => (
                <AddInstallment 
                key={i} 
                errors={errors}
                handleChange={handleChange}
                values={values}
                />
              ))} */}

              <Button variant="outlined" type="submit" disabled={!isValid}>
                存檔
              </Button>
            </Form>
          </motion.div>
        )}
      </Formik>

      {/* <AddCompony /> */}
    </>
  );
}

export default taskId;
