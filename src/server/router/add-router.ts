import * as trpc from "@trpc/server";
import { z } from "zod";
import { taskSqlType } from "../../types/task";
import { createProtectedRouter } from "./protected-router";

export const addRouter = createProtectedRouter()
  .mutation("company", {
    input: z.object({
      c_name: z.string(),
      c_title: z.string(),
      c_tax: z.string(),
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
                c_name: input.c_name,
              },
              {
                c_title: input.c_title,
              },
              {
                c_tax: input.c_tax,
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

  .query("location", {
    resolve: async ({ ctx }) => {
      // return await ctx.prisma.$queryRaw`SELECT location as label,id FROM location LIMIT 10`
      return await ctx.prisma.locations.findMany();
    },
  })
  .query("findCompany", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.company.findMany({});
    },
  })
  .query("user", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.user.findMany({
        select: {
          id: true,
          username: true,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      id: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const existTask = await ctx.prisma.task.count({
        where: {
          id: input.id,
        },
      });

      if (existTask != 0) {
        return { msg: "已有該專案編號", alertStatus: "warn" };
      }

      await ctx.prisma.task.create({
        data: {
          id: input.id,
          createAt: new Date(),
          locationId: 1,
        },
      });
      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  // .query("findOneTask", {
  //   input: z.object({
  //     taskId: z.string(),
  //   }),
  //   resolve: async ({ ctx, input }) => {
  //     // const tId = await input.taskId;
  //     return await ctx.prisma
  //       .$queryRaw`SELECT Task.id,Task.name,p,pValue,startDate,endDate,open,createAt,locationId,
  //   GROUP_CONCAT(DISTINCT Charge.userId) AS charge,
  //   (SELECT GROUP_CONCAT(percent) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS percent ,
  //   (SELECT GROUP_CONCAT(ok) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS ok
  //   FROM Task
  //   INNER JOIN Location ON Task.locationId = Location.id
  //   INNER JOIN Charge ON Task.id = Charge.taskId
  //   INNER JOIN Installment ON Task.id = Installment.TaskId
  //   WHERE Task.id=${input.taskId}
  //   group by Task.id;`;
  //   },
  // })
  // .query("findAllTask", {
  //   resolve: async ({ ctx }) => {
  //     const allTask: taskSqlType = await ctx.prisma
  //       .$queryRaw`SELECT Task.id,Task.name,p,pValue,startDate,endDate,open,createAt,locationId,
  //   GROUP_CONCAT(DISTINCT Charge.userId) AS charge,
  //   (SELECT GROUP_CONCAT(percent) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS percent ,
  //   (SELECT GROUP_CONCAT(ok) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS ok
  //   FROM Task
  //   INNER JOIN Location ON Task.locationId = Location.id
  //   INNER JOIN Charge ON Task.id = Charge.taskId
  //   INNER JOIN Installment ON Task.id = Installment.TaskId
  //   group by Task.id;`;

  //     return allTask;
  //   },
  // })
  .query("test", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.task.findMany({
        select:{
          task_name:true
        }
        // include:{
        //   charges:true,
        //   locations:true,
        //   CompanyTypes:true,
        //   installments:true
        // }
      })
    },
  })
  .mutation("all", {
    input: z.object({
      id: z.string(),
      task_name: z.string(),
      p: z.number(),
      pValue: z.number(),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      open: z.date().nullable(),
      createAt: z.date(),
      locationId: z.number(),
      userId: z.array(
        z.object({
          id: z.string(),
        })
      ),
      percent: z.array(
        z.object({
          rate: z.number(),
          ok: z.boolean(),
        })
      ),
      companyTypes: z
        .array(
          z.object({
            companyType: z.any(),
            companyId: z.number(),
            amount: z.number(),
            cutPayment: z.number().nullable(),
            note: z.string().nullable(),
          })
        )
        .nullable(),
    }),
    resolve: async ({ ctx, input }) => {
      const {
        id,
        task_name,
        p,
        pValue,
        startDate,
        endDate,
        open,
        createAt,
        locationId,
        userId,
        percent,
        companyTypes,
      } = input;

      await ctx.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          id: id,
          task_name: task_name,
          p: p,
          pValue: pValue,
          startDate: startDate,
          endDate: endDate,
          openDate: open,
          createAt: createAt,
          locationId: locationId,
        },
      });

      userId.map(async (chargeData) => {
        return await ctx.prisma.charge.create({
          data: {
            taskId: id,
            userId: chargeData.id,
          },
        });
      });

      if (companyTypes != null) {
        companyTypes.map(async (i) => {
          await ctx.prisma.companyType.create({
            data: {
              taskId: id,
              companyType: i.companyType,
              amount: i.amount,
              cutPayment: i.cutPayment,
              companyId: i.companyId,
            },
          });
        });
      }

      await ctx.prisma.history.create({
        data: {
          userId: ctx.session.user.id,
          taskId: id,
        },
      });

      percent.map(async (i) => {
        return await ctx.prisma.installment.create({
          data: {
            percent: i.rate,
            ok: i.ok,
            taskId: id,
          },
        });
      });
    },
  });
