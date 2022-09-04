import React, { useState } from "react";
import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { baseUserType, baseUserSchema } from "../../types/common";


const initialValues = {
  id: "",
  password: "",
};




function Login() {
  const router = useRouter();
const [msg,setMsg]=useState("")
  const onsubmit = async (values: baseUserType) => {
    await signIn("credentials", {
      redirect: false,
      id: values.id,
      password: values.password,
    }).then(res=>{
    if(res?.ok===true) router.push('/')
      setMsg("請確認帳號密碼")
    })
    
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(baseUserSchema)}
      onSubmit={onsubmit}
    >
      {({ errors, values, handleChange, isValid }) => (
        <div className="card bg-white shadow-xl md:card-side md:place-self-center md:w-full  max-w-4xl">
          <figure className="photoBox h-40 relative md:h-full md:w-1/2">
        
          </figure>
          <div className="card-body p-5">
            <Form className="flex flex-col gap-3 max-w-screen-sm ">

              <h2 className="text-3xl font-bold">登入</h2>
           
              <label className="label">
                <span className="label-text text-red-500">
                {msg}
                </span>
              </label>
              {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}

              <label htmlFor="id">使用者</label>
              <label className="label">
                <span className="label-text text-red-500">
                  {errors.id}
                </span>
              </label>
              <input
                id="id"
                name="id"
                type="text"
                onChange={handleChange}
                value={values.id}
                className="input input-lg input-bordered border-2 p-2 w-full"
              />

              <label htmlFor="password">密碼 </label>
              <label className="label">
                <span className="label-text text-red-500">
                  {errors.password}
                </span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="on"
                onChange={handleChange}
                value={values.password}
                className="input input-lg  input-bordered border-2 p-2 w-full"
              />
              <button
                className={`btn  btn-outline btn-success p-2 border-2 mt-3 ${
                  !isValid ? "btn-disabled" : ""
                }`}
                type="submit"
              >
                登入
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
