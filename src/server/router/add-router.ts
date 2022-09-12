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
      const payload = await ctx.prisma.user.findMany({
        select: {
          id: true,
          username: true,
        },
      });
      return payload.map((i) => {
        return { users: { id: i.id, username: i.username } };
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
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      task_name: z.string().or(z.undefined()),
      p: z.number().or(z.undefined()),
      pValue: z.number().or(z.undefined()),
      startDate: z.date().nullable().or(z.undefined()),
      endDate: z.date().nullable().or(z.undefined()),
      openDate: z.date().nullable().or(z.undefined()),
      createAt: z.date().or(z.undefined()),
      locations: z
        .object({
          id: z.number().or(z.undefined()),
          location_name: z.string().or(z.undefined()),
        })
        .or(z.undefined()),
      charges: z
        .array(
          z.object({
            users: z.object({
              id: z.string(),
              username: z.string(),
            }),
          })
        )
        .or(z.undefined()),
      installment: z
        .array(
          z.object({
            percent: z.number(),
            ok: z.boolean(),
          })
        )
        .or(z.undefined()),
      companyType: z
        .array(
          z.object({
            c_Type: z.string(),
            company: z.object({
              id: z.number(),
              c_name: z.string(),
              c_title: z.string(),
              c_tax: z.string(),
            }),
            amount: z.number().or(z.string()),
            cutPayment: z.number().nullable().or(z.string()),
            notes: z.string().nullable(),
          })
        )
        .or(z.undefined()),
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
        locations,
        charges,
        installment,
        companyType,
      } = input;

      type cType =
        | {
            userId: string;
          }[]
        | undefined;

      let chargePayload: cType = [];
      if (charges != undefined) {
        chargePayload = await charges.map((i) => {
          return { userId: i.users.id };
        });
      }

      type ctType =
        | {
            c_Type: string;
            companyId: number;
            amount: number;
            cutPayment: number | null;
            notes: string | null;
          }[]
        | undefined;

      let companyTypePayload: ctType = [];

      if (companyType != undefined) {
        companyTypePayload = await companyType.map((i) => {
          return {
            c_Type: i.c_Type,
            companyId: i.company.id,
            amount: Number(i.amount),
            cutPayment: Number(i.cutPayment),
            notes: i.notes,
          };
        });
      }
      // console.log(charges===undefined)
      await ctx.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          task_name: task_name || undefined,
          p: p || undefined,
          pValue: pValue || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          openDate: openDate || undefined,
          createAt: createAt || undefined,
          locationId: locations?.id || undefined,
          charges:
            charges != undefined
              ? {
                  deleteMany: {},
                  createMany: {
                    data: chargePayload,
                  },
                }
              : undefined,
          companyTypes:
            companyType != undefined
              ? {
                  deleteMany: {},
                  createMany: {
                    data: companyTypePayload,
                  },
                }
              : undefined,
          installments:
            installment != undefined
              ? {
                  deleteMany: {},
                  createMany: {
                    data: installment,
                  },
                }
              : undefined,
        },

        include: {
          charges: true,
          companyTypes: true,
          installments: true,
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
      locations: z.object({
        id: z.number(),
        location_name: z.string(),
      }),
      charges: z.array(
        z.object({
          users: z.object({
            id: z.string(),
            username: z.string(),
          }),
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
          company: z.object({
            id: z.number(),
            c_name: z.string(),
            c_title: z.string(),
            c_tax: z.string(),
          }),
          amount: z.number().or(z.string()),
          cutPayment: z.number().nullable().or(z.string()),
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
        locations,
        charges,
        installment,
        companyType,
      } = input;

      const chargePayload = await charges.map((i) => {
        return { userId: i.users.id };
      });

      const companyTypePayload = await companyType.map((i) => {
        return {
          c_Type: i.c_Type,
          companyId: i.company.id,
          amount: Number(i.amount),
          cutPayment: Number(i.cutPayment),
          notes: i.notes,
        };
      });

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
          locationId: locations.id,
          charges: {
            createMany: {
              data: chargePayload,
            },
          },
          companyTypes: {
            createMany: {
              data: companyTypePayload,
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
          companyTypes: true,
          installments: true,
        },
      });
    },
  });
