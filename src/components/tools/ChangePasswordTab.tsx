import React from "react";
import { changePasswordSchema, changePasswordType} from "../../types/common";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";


type changePasswordTypefun  = {
  id:string,
  sumbitHandler:(values: changePasswordType, action: any)=>void;
}

const ChangePasswordTab = ({
  sumbitHandler,id
}:changePasswordTypefun ) => {

  const initialValues = {
    id:id,
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
          <Form className="signupForm">
            <label htmlFor="oldPassword" className="">
              舊密碼
            </label>
            <div className="form-control ">
              <span className="formAlert">{errors.oldPassword}</span>

              <input
                type="password"
                name="oldPassword"
                autoComplete="on"
                placeholder="****"
                className="signupFormInput"
                onChange={handleChange}
                value={values.oldPassword}
              />
            </div>

            <label htmlFor="newPassword" className="">
              新密碼
            </label>
            <div className="form-control ">
              <span className="formAlert">{errors.newPassword}</span>

              <input
                type="password"
                name="newPassword"
                autoComplete="on"
                placeholder="****"
                className="signupFormInput"
                onChange={handleChange}
                value={values.newPassword}
              />
            </div>

            <button
              className={`signupBtn ${isValid ? "" : "forbidBtn"}`}
              type="submit"
              disabled={!isValid}
              aria-disabled="true"
            >
              更新
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordTab;
