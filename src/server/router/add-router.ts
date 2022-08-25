import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const addRouter = createProtectedRouter()
  .mutation("company", {
    input: z.object({
      name: z.string(),
      title: z.string(),
      tax: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { ...rest } = input;

      let existColumn = await ctx.prisma.company
        .count({
          where: {
            OR: [
              {
                name: input.name,
              },
              {
                title: input.title,
              },
              {
                tax: input.tax,
              },
            ],
          },
        })
        .then((res) => {
          return res;
        });

      if (existColumn != 0) {
        return { msg: "已有該公司", alertStatus: "warn" };
      }

      await ctx.prisma.company.create({
        data: {
          ...rest,
        },
      });

      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  .mutation("installment", {
    input: z.object({
      percent: z.number(),
      ok: z.boolean(),
      task: z.number(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { ...rest } = input;

      //記得加超過100的warn

      await ctx.prisma.installment.create({
        data: {
          ...rest,
        },
      });

      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  .query("location", {
    resolve: async ({ ctx }) => {
      // return await ctx.prisma.$queryRaw`SELECT location as label,id FROM location LIMIT 10`
      return await ctx.prisma.location.findMany();
    },
  })
  .mutation("note",{
    input:z.object({
      note:z.string()
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve:async({ctx,input})=>{
      await ctx.prisma.note.create({
        data:{
          note:input.note
        }
      })
      return { msg: "新增成功", alertStatus: "success" };
    }
  })
  .query("findCompany",{
    resolve:async({ctx})=>{
      return await ctx.prisma.company.findMany({})
    }
  })
  .query("user",{
    resolve:async({ctx})=>{
      return ctx.prisma.user.findMany({
        select:{
          id:true,
          username:true
        }
      })
    }
  })
