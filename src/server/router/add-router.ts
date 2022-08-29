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
  .mutation("note", {
    input: z.object({
      note: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      await ctx.prisma.note.create({
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



      return input.userId.map(async(chargeData)=>{
        return await ctx.prisma.charge.create({
          data: {
            taskId: input.taskId,
            userId: chargeData.id,
          },
        })
      })
      

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
  });
