import * as trpc from "@trpc/server";
import { any, z } from "zod";
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
      taskId: z.string(),
      percent: z.array(
        z.object({
          rate: z.number(),
          ok: z.boolean(),
        })
      ),
    }),
    resolve: async ({ ctx, input }) => {
      //記得加超過100的warn

      return input.percent.map(async (i) => {
        return await ctx.prisma.installment.create({
          data: {
            percent: i.rate,
            ok: i.ok,
            taskId: input.taskId,
          },
        });
      });
    },
  })
  .query("location", {
    resolve: async ({ ctx }) => {
      // return await ctx.prisma.$queryRaw`SELECT location as label,id FROM location LIMIT 10`
      return await ctx.prisma.location.findMany();
    },
  })
  .mutation("priNote", {
    input: z.object({
      note: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.prisma.priNote.create({
        data: {
          note: input.note,
        },
      });
      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  .mutation("secNote", {
    input: z.object({
      note: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.prisma.secNote.create({
        data: {
          note: input.note,
        },
      });
      return { msg: "新增成功", alertStatus: "success" };
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
      name: z.string(),
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
          name: input.name,
          createAt: new Date(),
          locationId: 1,
        },
      });
      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  .mutation("task", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      p: z.number(),
      pValue: z.number(),
      startDate: z.date(),
      endDate: z.date(),
      open: z.date(),
      createAt: z.date(),
      locationId: z.number(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const {
        id,
        name,
        p,
        pValue,
        startDate,
        endDate,
        open,
        createAt,
        locationId,
      } = input;
      try {
        await ctx.prisma.task.update({
          where: {
            id: id,
          },
          data: {
            name: name,
            p: p,
            pValue: pValue,
            startDate: startDate,
            endDate: endDate,
            open: open,
            createAt: createAt,
            locationId: locationId,
          },
        });
      } catch (e) {
        console.log(e);
      }

      return { msg: "新增成功", alertStatus: "success" };
    },
  })
  .mutation("charge", {
    input: z.object({
      userId: z.array(
        z.object({
          id: z.string(),
        })
      ),
      taskId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(input.taskId, input.userId);

      await ctx.prisma.charge.deleteMany({
        where: {
          taskId: input.taskId,
        },
      });

      return input.userId.map(async (chargeData) => {
        return await ctx.prisma.charge.create({
          data: {
            taskId: input.taskId,
            userId: chargeData.id,
          },
        });
      });
    },
  })
  .mutation("history", {
    input: z.object({
      userId: z.string(),
      taskId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.history.create({
        data: {
          userId: input.userId,
          taskId: input.taskId,
        },
      });
    },
  })
  .query("findOneTask", {
    input: z.object({
      taskId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      // const tId = await input.taskId;
      return await ctx.prisma
        .$queryRaw`SELECT Task.id,Task.name,p,pValue,startDate,endDate,open,createAt,locationId,
    GROUP_CONCAT(DISTINCT Charge.userId) AS charge,
    (SELECT GROUP_CONCAT(percent) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS percent ,
    (SELECT GROUP_CONCAT(ok) FROM Installment JOIN Task ON Installment.taskId=TASK.id) AS ok
    FROM Task
    INNER JOIN Location ON Task.locationId = Location.id
    INNER JOIN Charge ON Task.id = Charge.taskId
    INNER JOIN Installment ON Task.id = Installment.TaskId
    WHERE Task.id=${input.taskId}
    group by Task.id;`;
    },
  })
  .mutation("priCompany", {
    input: z.object({
      taskId: z.string(),
      companyId: z.number(),
      amount: z.number(),
      cutPayment: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.primaryCompany.create({
        data: {
          taskId: input.taskId,
          amount: input.amount,
          cutPayment: input.cutPayment,
          companyId: input.companyId,
        },
      });
    },
  })
  .mutation("secCompany", {
    input: z.object({
      taskId: z.string(),
      secCompany: z.array(
        z.object({
          companyId: z.number(),
          amount: z.number(),
          cutPayment: z.number(),
        })
      ),
    }),
    resolve: async ({ ctx, input }) => {
      const Cid = input.secCompany.map((i) => i.companyId);

      await input.secCompany.map(async (i) => {
        await ctx.prisma.secondaryCompany.create({
          data: {
            taskId: input.taskId,
            amount: i.amount,
            cutPayment: i.cutPayment,
            companyId: i.companyId,
          },
        });
      });
    },
  })
  .mutation("test", {
    input: z.object({
      so: z.string(),
    }),
    resolve: async ({ ctx }) => {
      return { da: "sd" };
    },
  })
  .mutation("all", {
    input: z.object({
      id: z.string(),
      name: z.string(),
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
      priCompany:
        z.object({
          companyId: z.number(),
          amount: z.number(),
          cutPayment: z.number().nullable(),
          note: z.string().nullable(),
        }
      ),
      secCompany: z.array(
        z.object({
          companyId: z.number(),
          amount: z.number(),
          cutPayment: z.number().nullable(),
          note: z.string().nullable(),
        })
      ).nullable(),
    }),
    resolve: async ({ ctx, input }) => {
      const {
        id,
        name,
        p,
        pValue,
        startDate,
        endDate,
        open,
        createAt,
        locationId,
        userId,
        percent,
        priCompany,
        secCompany,
      } = input;

      await ctx.prisma.task.update({
        where:{
          id:id
        },
        data: {
          id: id,
          name: name,
          p: p,
          pValue: pValue,
          startDate: startDate,
          endDate: endDate,
          open: open,
          createAt: createAt,
          locationId: locationId, 
        }
      });

     userId.map(async (chargeData) => {
        return await ctx.prisma.charge.create({
          data: {
            taskId: id,
            userId: chargeData.id,
          },
        });
      });

     await ctx.prisma.primaryCompany.create({
        data: {
          taskId: id,
          amount: priCompany.amount,
          cutPayment: priCompany.cutPayment,
          companyId: priCompany.companyId,
        },
      });



     if(secCompany!=null){
      await secCompany.map(async (i) => {
        await ctx.prisma.secondaryCompany.create({
          data: {
            taskId: id,
            amount: i.amount,
            cutPayment: i.cutPayment,
            companyId: i.companyId,
          },
        });
      });
     }
    


      await ctx.prisma.history.create({
        data: {
          userId: ctx.session.id,
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
