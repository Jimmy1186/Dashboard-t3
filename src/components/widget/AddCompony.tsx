import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { companySchema, companyType } from "../../types/common";
import { trpc } from "../../utils/trpc";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";

const initialValues = {
  c_name: "",
  c_title: "",
  c_tax: "",
};

type toggleCompanyType = {
  openAddCompany: boolean;
  setOpenAddCompany: (toggle: boolean) => void;
};

function AddCompony({ openAddCompany, setOpenAddCompany }: toggleCompanyType) {
  const addCompanyMutation = trpc.useMutation(["add.company"]);
  const handleClose = () => {
    setOpenAddCompany(false);
  };
  const onAddCompany = useCallback(
    ({ c_name, c_title, c_tax }: companyType) => {
      addCompanyMutation.mutate({
        c_name,
        c_title,
        c_tax,
      });
    },
    [addCompanyMutation]
  );

  const sumbitHandler = (values: companyType, action: any) => {
    onAddCompany(values);
    action.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(companySchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid }) => (
        <Dialog open={openAddCompany} onClose={handleClose}>
          <Form className="signupForm">
            <h3>新增公司</h3>

            {addCompanyMutation.data?.msg}

            <p className="errormsg">{errors.c_name}</p>

            <TextField
              id="outlined-basic"
              label="公司名稱"
              name="c_name"
              value={values.c_name}
              onChange={handleChange}
              variant="outlined"
            />
            <p className="errormsg">{errors.c_title}</p>

            <TextField
              id="outlined-basic"
              label="公司抬頭"
              name="c_title"
              value={values.c_title}
              onChange={handleChange}
              variant="outlined"
            />
            <p className="errormsg">{errors.c_tax}</p>

            <TextField
              id="outlined-basic"
              label="統編"
              name="c_tax"
              value={values.c_tax}
              onChange={handleChange}
            />

            <Button variant="outlined" type="submit" disabled={!isValid}>
              存檔
            </Button>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
}

export default AddCompony;
