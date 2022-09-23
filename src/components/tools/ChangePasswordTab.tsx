import React from "react";
import { changePasswordSchema, changePasswordType } from "../../types/common";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Box, Button, TextField } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";


type changePasswordTypefun = {
  sumbitHandler: (values: changePasswordType, action: any) => void;
};

const ChangePasswordTab = ({ sumbitHandler }: changePasswordTypefun) => {
  const initialValues = {
    newPassword: "",
    oldPassword: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(changePasswordSchema)}
        onSubmit={sumbitHandler}
      >
        {({ errors, values, handleChange, isValid }) => (
          <div className="bgPaper  p-7 md:w-full">
            <h3>更改密碼</h3>
            <Form className="flex flex-col gap-1">
              <div className={`inputBox`}>
                <p className="errormsg">{errors.oldPassword}</p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="舊密碼"
                    variant="standard"
                    type="password"
                    name="oldPassword"
                    autoComplete="on"
                    placeholder="****"
                    className="signupFormInput"
                    onChange={handleChange}
                    value={values.oldPassword}
                  />
                </Box>
              </div>

              <div className={`inputBox`}>
                <p className="errormsg">{errors.newPassword}</p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="新密碼"
                    variant="standard"
                    type="password"
                    name="newPassword"
                    autoComplete="on"
                    placeholder="****"
                    className="signupFormInput"
                    onChange={handleChange}
                    value={values.newPassword}
                  />
                </Box>
              </div>

              <Button
                className={`signupBtn ${isValid ? "" : "forbidBtn"}`}
                type="submit"
                disabled={!isValid}
                variant="outlined"
                aria-disabled="true"
              >
                更新
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordTab;
