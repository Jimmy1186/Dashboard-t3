import { z } from "zod";


export const taskSql = z.object({
    name: z.string(),
    p: z.number(),
    pValue: z.number(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    open: z.date().nullable(),
    createAt: z.date().nullable(),
    locationId: z.number(),
    charge: z.string(),
    id: z.string(),
    percent: z.string(),
    ok: z.string(),
  });

  export type taskSqlType = z.infer<typeof taskSql>