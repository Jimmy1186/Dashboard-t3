import React from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  editUserSchema,
  signupUserSchema,
  signupUserType,
  userInitial,
  userTableType,
} from "../../types/common";
import { Box, Button, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import PinIcon from "@mui/icons-material/Pin";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

type signupFromType = {
  sumbitHandler: (values: signupUserType, action: any) => void;
  editSubmit: (values: userTableType, action: any) => void;
  handleClose: (i: boolean) => void;
  coe: boolean;
  initialValues: userInitial;
};

function Signup({
  sumbitHandler,
  coe,
  initialValues,
  editSubmit,
  handleClose,
}: signupFromType) {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(
        coe ? signupUserSchema : editUserSchema
      )}
      onSubmit={coe ? sumbitHandler : editSubmit}
    >
      {({ errors, values, handleChange, isValid }) => (
        <Form className="signupForm">
          <h3 className="signupTitle">新增使用者</h3>
          <div className="inputBox">
            <p className="errormsg">{errors.id}</p>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PinIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                disabled={!coe}
                id="input-with-sx"
                label=" 使用者編號"
                variant="standard"
                name="id"
                placeholder="johnCena"
                onChange={handleChange}
                value={values.id}
              />
            </Box>
          </div>

          <div className="inputBox">
            <p className="errormsg">{errors.username}</p>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="使用者名稱"
                variant="standard"
                name="username"
                placeholder="johnCena"
                className="signupFormInput"
                onChange={handleChange}
                value={values.username}
              />
            </Box>
          </div>

          <div className={`inputBox ${coe ? "" : "hiddenAdim"}`}>
            <p className="errormsg">{errors.password}</p>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label=" 密碼"
                variant="standard"
                type="password"
                name="password"
                autoComplete="on"
                placeholder="****"
                className="signupFormInput"
                onChange={handleChange}
                value={values.password}
              />
            </Box>
          </div>

          <div className="inputBox">
            <p className="errormsg">{errors.role?.roles}</p>
            <Box>
              <FormLabel id="demo-row-radio-buttons-group-label">
                權限
              </FormLabel>

              <RadioGroup name="radio-buttons-group" value={values.role.roles}>
                <FormControlLabel
                  name="role.roles"
                  value="R"
                  onChange={handleChange}
                  control={<Radio />}
                  label="訪客"
                />
                <FormControlLabel
                  name="role.roles"
                  value={"W"}
                  onChange={handleChange}
                  control={<Radio />}
                  label="使用者"
                />
                <FormControlLabel
                  name="role.roles"
                  value={"X"}
                  onChange={handleChange}
                  control={<Radio />}
                  label="管理員"
                />
              </RadioGroup>
            </Box>
          </div>
          <div className="flex justify-around gap-3">
            <Button
              fullWidth={true}
              variant="outlined"
              onClick={() => handleClose}
            >
              取消
            </Button>
            <Button
              fullWidth={true}
              className={`signupBtn ${isValid ? "" : "forbidBtn"}`}
              type="submit"
              disabled={!isValid}
              variant="contained"
            >
              新增
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
