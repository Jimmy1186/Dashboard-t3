import React from "react";
import { z } from "zod";

export const baseUserSchema = z.object({
  id: z
    .string()
    .min(6, "固定6位")
    .max(6, "固定6位")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp("^[A-Z0-9_.]+$"), "english and number only"),

  password: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(12, "less then 12 characters long")
    .regex(new RegExp("^[A-Za-z0-9_.]+$"), "english and number only"),
});

export const signupUserSchema = baseUserSchema.extend({
  username: z
    .string()
    .min(2, "太短")
    .max(12, "太長")
    .regex(new RegExp("[^\x00-\xff]+$"), "只能中文"),
  role: z.string().min(1, { message: "Required" }).max(1),
});

export const changePasswordSchema = z.object({
  id: z
  .string()
  .min(6, "固定6位")
  .max(6, "固定6位")
  .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  .regex(new RegExp("^[A-Z0-9_.]+$"), "english and number only"),
  oldPassword: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(12, "less then 12 characters long")
    .regex(new RegExp("^[A-Za-z0-9_.]+$"), "english and number only"),
  newPassword: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(12, "less then 12 characters long")
    .regex(new RegExp("^[A-Za-z0-9_.]+$"), "english and number only"),
});

export type changePasswordType = z.infer<typeof changePasswordSchema>
export type baseUserType = z.infer<typeof baseUserSchema>;
export type signupUserType = z.infer<typeof signupUserSchema>;

//   export interface signupSchema extends dataType {
//     role: string
//   }

export type navStateType = {
  navState: boolean;
  setNavState: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface pageIndexNavStateType extends navStateType {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export type glassContainerType = {
  children: React.ReactNode;
};

export type alerType = {
  isShowingAlert: boolean;
  alertTitle: string | null;
  alertStatus: string;
};

export type userType = {
  id?: string;
  username?: string;
  oldPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  onUpdate: () => void;
};



export const companySchema = z.object({
  c_name: z.string()
  .min(2,"最少兩個字")
  .max(10,"最多10個字"),
  c_title: z.string()
  .min(6,"最少六個字")
  .max(50,"最多50個字")
  .regex(new RegExp("[^\x00-\xff]+$"), "只能中文"),
  c_tax: z.string()
  .max(8,"8 characters")
  .min(8,"8 characters")
  .regex(new RegExp("^[0-9_.]+$"), "number only"),
});

export type companyType = z.infer<typeof companySchema>;