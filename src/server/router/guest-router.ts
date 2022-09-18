import { createRouter } from "./context";
import ExcelJs from "exceljs";
import { z } from "zod";
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
      xlsx: z.array(z.any()),
      profit: z.array(z.number()).or(z.undefined()),
      cost: z.array(z.number()).or(z.undefined()),
      outbound: z.array(z.number()).or(z.undefined()),
    }),

    resolve: async ({ ctx, input }) => {
      // console.log(input.xlsx)

      const wb = await new ExcelJs.Workbook();
      await wb.xlsx.readFile(PUBLIC_FILE_PATH).then(() => {
        const ws = wb.getWorksheet(1);
        const sd = input.xlsx[0].charges.map((i:any)=>`${i.users.id}${i.users.username}`)
        console.log(sd[0])

        ws.getCell("M2").value=input.xlsx[0].id
        ws.getCell("H4").value = input.xlsx[0].companyTypes[0].company.c_title;
        ws.getCell("R4").value =input.xlsx[0].locations.location_name;
        ws.getCell("Z4").value=input.xlsx[0].task_name;
        ws.getCell("AL4").value=input.xlsx[0].charges.map((i:any)=>{return `${i.users.id}${i.users.username}`})
        ws.getCell("H5").value= input.xlsx[0].companyTypes[0].amount;
        ws.getCell("R5").value=input.xlsx[0].p;
        ws.getCell("Z5").value=input.xlsx[0].pValue;
        ws.getCell("AF5").value=input.xlsx[0].adapt;
        // ws.getCell("").value=input.xlsx[0]
        // ws.getCell("").value=input.xlsx[0]
        ws.getCell("V6").value=input.xlsx[0].openDate;
        // ws.getCell("").value=input.xlsx[0]
        // ws.getCell("").value=input.xlsx[0]
      });

      await wb.xlsx.writeFile(PUBLIC_FILE_PATH);

      return {
        xlsxPayload: fs.readFileSync(PUBLIC_FILE_PATH).toString("base64"),
      };
      // const payload = await Promise.all(
      //   input.xlsx.map(async (v) => {
      //     return await wb.xlsx
      //       .readFile(PUBLIC_FILE_PATH)
      //       .then(() => {
      //         let ws = wb.getWorksheet(1);
      //         ws.getCell("H4").value = v.pValue;
      //         wb.xlsx.writeFile(PUBLIC_FILE_PATH);
      //         return fs.readFileSync(PUBLIC_FILE_PATH).toString("base64");
      //       })
      //   })
      // );

      // console.log(payload);
    },
  });
