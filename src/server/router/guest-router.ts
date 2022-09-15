import { createRouter } from "./context";
import ExcelJs from "exceljs";
import { z } from "zod";
import { createBox } from "framer-motion";
import fs from "fs";
const PUBLIC_FILE_PATH = "./public/01.xlsx";

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
          adapt: true,
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
  .mutation("xlsx", {
    input: z.object({
      xlsx: z.array(
        z.any()
      ),
    }),

    resolve: async ({ ctx,input }) => {
      console.log(input.xlsx)
      const wb = await new ExcelJs.Workbook();
      await wb.xlsx.readFile(PUBLIC_FILE_PATH).then(() => {
        var ws = wb.getWorksheet(1);
        ws.getCell("H4").value = "OKM";
      });

      await wb.xlsx.writeFile(PUBLIC_FILE_PATH);

      const stream = fs.readFileSync(PUBLIC_FILE_PATH);

      return { xxx: stream.toString("base64") };
    },
  });
