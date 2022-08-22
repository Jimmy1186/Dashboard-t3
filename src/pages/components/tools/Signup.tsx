import React from 'react'






import { useReducer, useState } from "react";
import { Formik, Form } from "formik";
import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { trpc } from "../../../utils/trpc";
import { alerType, signupUserSchema,signupUserType } from "../../../types/common";



const initialValues = {
  id:"",
  username: "",
  password: "",
  role: "",
};

 type signupFromType  = {
    sumbitHandler:(values: signupUserType, action: any)=>void;
}

function Signup({sumbitHandler}:signupFromType) {

    
  



  return (
    <Formik
    initialValues={initialValues}
    validationSchema={toFormikValidationSchema(signupUserSchema)}
    onSubmit={sumbitHandler}
  >
    {({ errors, values, handleChange, isValid }) => (
      
          <Form className="signupForm">
      <label htmlFor="id" className="">
              使用者編號
            </label>
            <div className="form-control ">
          
                <span className="formAlert">
                  {errors.id}
                </span>
         
              <input
                type="text"
                name="id"
                placeholder="johnCena"
                className="signupFormInput"
                onChange={handleChange}
                value={values.id}
              />
            </div>



            <label htmlFor="username" className="">
              使用者名稱
            </label>
            <div className="form-control ">
          
                <span className="formAlert">
                  {errors.username}
                </span>
         
              <input
                type="text"
                name="username"
                placeholder="johnCena"
                className="signupFormInput"
                onChange={handleChange}
                value={values.username}
              />
            </div>

            <label htmlFor="password" className="">
              密碼
            </label>
            <div className="form-control ">
         
              <span className="formAlert">
                  {errors.password}
                </span>

              <input
                type="password"
                name="password"
                autoComplete="on"
                placeholder="****"
                className="signupFormInput"
                onChange={handleChange}
                value={values.password}
              />
            </div>
<label htmlFor="role">權限</label>
            <div className="form-control  ">
              
              <span className="formAlert">
                {errors.role}
              </span>

              <label className="label ">
                <span className="label-text">訪客</span>
                <input
                  type="radio"
                  name="role"
                  value={3}
                  className=""
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label ">
                <span className="label-text">使用者</span>
                <input
                  type="radio"
                  name="role"
                  className=""
                  value={2}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="">
                <span className="">管理員</span>
                <input
                  type="radio"
                  name="role"
                  className=""
                  onChange={handleChange}
                  value={1}
                />
              </label>
            </div>

            <button
              className={`signupBtn ${isValid? "":"forbidBtn"}` }
              type="submit"
              disabled={!isValid}
              aria-disabled="true"
            >
              新增
            </button>
         
          </Form>
     
    )}
  </Formik>
  )
}

export default Signup