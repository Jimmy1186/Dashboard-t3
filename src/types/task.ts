import { z } from "zod";


export const taskSchema = z.object({
  id: z.string()
  .min(6,"六個字元 範例'22001'")
  .max(6,"超過了")
  .regex(new RegExp("^[0-9-]+$"), "只能數字")
  .regex(new RegExp(".*[-].*"), "需要'-'"),
  task_name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  openDate: z.date().nullable(),
  createAt: z.date(),
  locationId: z.number(),
  charges: z.array(
    z.object({
     users: z.object({
      id:z.string(),
      username:z.string()
     }),
    })
  ),
  charge: z.array(
    z.object({
     userId: z.string(),
    })
  ),
  installment: z.array(
    z.object({
      percent: z.number(),
      ok: z.boolean(),
    })
  ),
  companyType: z
    .array(
      z.object({
        c_Type: z.string(),
        companyId: z.number(),
        amount: z.number(),
        cutPayment: z.number().nullable(),
        notes: z.string().nullable(),
      })
    )
    ,
});

export type taskType = z.infer<typeof taskSchema>;
