import React, { useCallback, useState } from "react";
import AddCharge from "../components/widget/AddCharge";
import AddCompony from "../components/widget/AddCompony";
import AddInstallment from "../components/widget/AddInstallment";
import AddLocation from "../components/widget/AddLocation";
import AddPriOrSecCompany from "../components/widget/AddPriOrSecCompany";
import AddTask from "../components/widget/AddTask";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@mui/icons-material/Add";

const taskSchema = z.object({
  id:z.string(),
  task_name: z.string(),
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
  companyTypes: z.array(
    z.object({
      companyId: z.number(),
      companyType:z.string(),
      amount: z.number(),
      cutPayment: z.number(),
      notes: z.string().nullable(),
    })
  ).nullable(),
});


export type taskType = z.infer<typeof taskSchema>;


function taskId() {
  const router = useRouter();
  const [companyToggle, setCompanyToggle] = useState(false);
  const taskId = router.query.taskId as string;



  const AllMutation = trpc.useMutation(['add.all'])

  let initialValues = {
    id:taskId,
    task_name: "",
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
    companyTypes: [
      {
        companyType:"pri",
        companyId: 0,
        amount: 0,
        cutPayment: 0,
        notes: null,
      },
    ],
  };


const onAll = useCallback(
 
  (values:taskType)=>{

    const {
      id,
      task_name,
      p,
      pValue,
      startDate,
      endDate,
      open,
      createAt,
      locationId,
      userId,
      percent,
      companyTypes,
    } = values;


    if(companyTypes===null){
      return
    }




    AllMutation.mutate({
      id: id,
      task_name:task_name,
      p: p,
      pValue: pValue,
      startDate: startDate,
      endDate: endDate,
      open: open,
      createAt: createAt,
      locationId: locationId,
      userId: userId,
      percent:percent,
      companyTypes:companyTypes,

    })
  },
  [AllMutation]
)




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
              <h2>編輯表單</h2>
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
