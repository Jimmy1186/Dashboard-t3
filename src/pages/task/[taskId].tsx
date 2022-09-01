import React, { useCallback, useState } from "react";
import AddCharge from "../components/widget/AddCharge";
import AddCompony from "../components/widget/AddCompony";
import AddInstallment from "../components/widget/AddInstallment";
import AddLocation from "../components/widget/AddLocation";
import AddPriOrSecCompany from "../components/widget/AddPriOrSecCompany";
import AddTask from "../components/widget/AddTask";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { object, z } from "zod";
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
  id:z.string(),
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date(),
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
  priCompany: z.object({
    companyId: z.number(),
    amount: z.number(),
    cutPayment: z.number(),
    note: z.string().nullable(),
  }),
  secCompany: z.array(
    z.object({
      companyId: z.number(),
      amount: z.number(),
      cutPayment: z.number(),
      note: z.string().nullable(),
    })
  ).nullable(),
});

const taskSql = z.object({
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date().nullable(),
  locationId: z.number(),
  charge: z.string(),
  id: z.string(),
  percent: z.string(),
  ok: z.string(),
});
export type taskSqlType = z.infer<typeof taskSql>;

export type taskType = z.infer<typeof taskSchema>;

const convertTypeZ = z.array(z.object({}));
type convertType = z.infer<typeof convertTypeZ>;

function taskId() {
  const router = useRouter();
  const [companyToggle, setCompanyToggle] = useState(false);
  const taskId = router.query.taskId as string;
  const { data: session } = useSession();

  // const {
  //   data: task,
  //   refetch,
  //   isLoading,
  //   isSuccess,
  // } = trpc.useQuery(["add.findOneTask", { taskId: taskId }]);
  const taskMutation = trpc.useMutation(["add.task"]);
  const chargeMutation = trpc.useMutation(["add.charge"]);
  const historyMutation = trpc.useMutation(["add.history"]);
  const installmentMutation = trpc.useMutation(["add.installment"]);
  const priCompanyMutation = trpc.useMutation(["add.priCompany"]);
  const secCompanyMutation = trpc.useMutation(["add.secCompany"]);
  const testQuery = trpc.useMutation(['add.test'])
  const AllMutation = trpc.useMutation(['add.all'])

  let initialValues = {
    id:taskId,
    name: "",
    p: 0,
    pValue: 0,
    startDate: null,
    endDate: null,
    open: null,
    createAt:  new Date(),
    locationId: 0,
    userId: [],
    percent: [
      {
        rate: 0,
        ok: false,
      },
    ],
    priCompany: {
      companyId: 0,
      amount: 0,
      cutPayment: 0,
      note: null,
    },
    secCompany: [
      {
        taskId:taskId as string,
        companyId: 0,
        amount: 0,
        cutPayment: 0,
        note: null,
      },
    ],
  };


const onAll = useCallback(
 
  (values:taskType)=>{

    const {
      id,
      name,
      p,
      pValue,
      startDate,
      endDate,
      open,
      createAt,
      locationId,
      userId,
      percent,
      priCompany,
      secCompany,
    } = values;


    if(priCompany===null){
      return
    }




    AllMutation.mutate({
      id: id,
      name: name,
      p: p,
      pValue: pValue,
      startDate: startDate,
      endDate: endDate,
      open: open,
      createAt: createAt,
      locationId: locationId,
      userId: userId,
      percent:percent,
      priCompany:priCompany,
      secCompany:secCompany
    })
  },
  [AllMutation]
)


  const onTest = useCallback(
    () => {
      testQuery.mutate({
       so:"sad"
      });
    },
    [testQuery]
  );

  const sumbitHandler = (values: taskType, action: any) => {

    onAll(values)
    console.log(values);
    action.resetForm()
  };

  return (
    <>
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

              <AddPriOrSecCompany
                companyType="priCompany"
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
                handleChange={handleChange}
                values={values}
              />

              <AddPriOrSecCompany
                companyType="secCompany"
                errors={errors}
                setFieldValue={setFieldValue}
                setErrors={setErrors}
                handleChange={handleChange}
                values={values}
              />

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

              <Button variant="outlined" type="submit" disabled={!isValid}>
                存檔
              </Button>
            </Form>
          </motion.div>
        )}
      </Formik>

      {companyToggle ? (
        <>
        
          <AddCompony
            setCompanyToggle={setCompanyToggle}
            companyToggle={companyToggle}
          />
        </>
      ) : (
        <>
          <Button
            type="button"
            startIcon={<AddIcon />}
            onClick={() => setCompanyToggle(!companyToggle)}
          >
        
            新增公司資料
          </Button>
        </>
      )}
    </>
  );
}

export default taskId;
