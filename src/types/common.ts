import React from "react";
import { z } from "zod";

export const baseUserSchema = z.object({
    username: z
      .string()
      .min(4, "Password must be at least 4 characters long")
      .max(12, { message: "less then 12 characters long" })
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp("^[A-Za-z0-9_.]+$"), "english and number only"),

    password: z
      .string()
      .min(3, "Password must be at least 3 characters long")
      .max(12, "less then 12 characters long")
      .regex(new RegExp("^[A-Za-z0-9_.]+$"), "english and number only"),
  });
  
export const signupUserSchema = baseUserSchema.extend({
    role: z.string().min(1, { message: "Required" }).max(1),
})

  export type baseUserType = z.infer<typeof baseUserSchema>;
  export type signupUserType = z.infer<typeof signupUserSchema>


//   export interface signupSchema extends dataType {
//     role: string
//   }

  export type alerType = {
    alertTitle: string | null;
    alertStatus: "success" | "info" | "warn" | "error" | null;
    
  };



export type navStateType ={
  navState:boolean;
  setNavState:React.Dispatch<React.SetStateAction<boolean>>
}

export interface pageIndexNavStateType extends navStateType{
  pageIndex:number,
  setPageIndex:React.Dispatch<React.SetStateAction<number>>
}

export type glassContainerType ={
  children:React.ReactNode;
}