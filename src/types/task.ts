import { z } from "zod";
import { Prisma } from "@prisma/client";

export const taskSchema = z.object({
  id: z.string()
  .min(6,"六個字元 範例'22001'")
  .max(6,"超過了")
  .regex(new RegExp("^[0-9-]+$"), "只能數字")
  .regex(new RegExp(".*[-].*"), "需要'-'"),
  task_name: z.string(),
  p: z.number(),
  pValue: z.any(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  openDate: z.date().nullable(),
  createAt: z.date(),
  locations: z.object({
    id:z.number(),
    location_name:z.string()
  }),
  charges: z.array(
    z.object({
     users: z.object({
      id:z.string(),
      username:z.string()
     }),
    })
  ),
  installments: z.array(
    z.object({
      percent: z.number(),
      ok: z.boolean(),
    })
  ),
  companyTypes: z
    .array(
      z.object({
        c_Type: z.string(),
        company: z.object({
          id:z.number(),
          c_name:z.string(),
          c_title:z.string(),
          c_tax:z.string()
        }),
        amount: z.number().or(z.string()),
        cutPayment: z.number().nullable().or(z.string()),
        notes: z.string().nullable(),
      })
    )
    ,
});

export type taskType = z.infer<typeof taskSchema>;




export type tl = {
  id: string;
  task_name: string | null;
  p: number | null;
  pValue: Prisma.Decimal | null;
  startDate: Date | null;
  endDate: Date | null;
  createAt: Date;
  openDate: Date | null;
  locations: {
    location_name: string | null;
    id: number;
  } | null;
  charges:
    | {
        users: {
          username: string;
          id: string;
        } | null;
      }[]
    | null;
  installments:
    | {
        percent: number | null;
        ok: boolean;
      }[]
    | null;
  companyTypes:
    | {
        company: {
          id: number | null;
          c_name: string | null;
          c_title: string | null;
          c_tax: string | null;
        } | null;
        c_Type: string;
        amount: Prisma.Decimal;
        cutPayment: Prisma.Decimal | null;
        notes: string | null;
      }[]
    | null;
};


