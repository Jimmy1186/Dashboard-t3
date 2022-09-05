import { z } from "zod";
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

      const existColumn = await ctx.prisma.company
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
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query("taskList", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.task.findMany({
        select: {
          id: true,
          task_name: true,
          startDate: true,
          endDate: true,
          createAt: true,
          openDate: true,
          charges: {
            select: {
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          locations: {
            select: {
              location_name: true,
            },
          },
          CompanyTypes: {
            select: {
              amount: true,
              cutPayment: true,
              notes: true,
              company: {
                select: {
                  c_name: true,
                },
              },
            },
          },
          installments: {
            select: {
              percent: true,
              ok: true,
            },
          },
        },
      });
    },
  })
  .mutation("createTask", {
    input: z.object({
      id: z.string(),
      task_name: z.string(),
      p: z.number(),
      pValue: z.number(),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      openDate: z.date().nullable(),
      createAt: z.date(),
      locationId: z.number(),
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
      companyType: z.array(
        z.object({
          c_Type: z.string(),
          companyId: z.number(),
          amount: z.number(),
          cutPayment: z.number().nullable(),
          notes: z.string().nullable(),
        })
      ),
    }),
    resolve: async ({ ctx, input }) => {
      const {
        id,
        task_name,
        p,
        pValue,
        startDate,
        endDate,
        openDate,
        createAt,
        locationId,
        charge,
        installment,
        companyType,
      } = input;

      return await ctx.prisma.task.create({
        data: {
          id: id,
          task_name: task_name,
          p: p,
          pValue: pValue,
          startDate: startDate,
          endDate: endDate,
          openDate: openDate,
          createAt: createAt,
          locationId: locationId,
          charges: {
            createMany: {
              data: charge,
            },
          },
          CompanyTypes: {
            createMany: {
              data: companyType,
            },
          },
          history: {
            create: {
              userId: ctx.session.user.id,
            },
          },
          installments: {
            createMany: {
              data: installment,
            },
          },
        },
        include: {
          charges: true,
          CompanyTypes: true,
          history: true,
          installments: true,
        },
      });
    },
  });
