import { createRouter } from "./context";


export const guestRouter = createRouter()
.query("taskList", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.task.findMany({
        select: {
          id: true,
          task_name: true,
          p: true,
          pValue: true,
          startDate: true,
          endDate: true,
          createAt: true,
          openDate: true,
          charges: {
            select: {
              users: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          },
          locations: {
            select: {
              location_name: true,
              id: true,
            },
          },
          companyTypes: {
            select: {
              amount: true,
              c_Type: true,
              cutPayment: true,
              notes: true,
              company: {
                select: {
                  id: true,
                  c_name: true,
                  c_title: true,
                  c_tax: true,
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