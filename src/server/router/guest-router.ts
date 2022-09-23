import { createRouter } from "./context";
import ExcelJs from "exceljs";
import { z } from "zod";
import { format } from "date-fns";
import { rawX } from "../../utils/rawXlsx";
const numberWithCommas = (x: number | undefined) => {
  if (x === undefined) x = 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
        z.object({
          id: z.string(),
          task_name: z.string(),
          p: z.number(),
          pValue: z.any(),
          startDate: z.date().nullable(),
          endDate: z.date().nullable(),
          openDate: z.date().nullable(),
          createAt: z.date(),
          adapt: z.string(),
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
          installments: z.array(
            z.object({
              percent: z.number(),
              ok: z.boolean(),
            })
          ),
          companyTypes: z.array(
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
        })
      ),
      profit: z.array(z.number()).or(z.undefined()),
      cost: z.array(z.number()).or(z.undefined()),
      outbound: z.array(z.number()).or(z.undefined()),
    }),

    resolve: async ({ ctx, input }) => {
      // console.log("outbound here")
      // console.log(input.outbound)
      // console.log(input.xlsx)
      const xPayload = rawX;
      const wb = await new ExcelJs.Workbook();

      const buf = Buffer.from(xPayload, "base64");

      await wb.xlsx.load(buf);

      await wb.xlsx.load(buf).then(() => {
        const ws = wb.getWorksheet(1);

        const main_amount = numberWithCommas(
          Number(input.xlsx[0]?.companyTypes[0]?.amount)
        );

        const iLength = input.xlsx[0]?.installments.length as number;
        const installPayload = input.xlsx[0]?.installments;
        const secComypany = input.xlsx[0]?.companyTypes.splice(1);

        const cd = input.xlsx[0]?.createAt as Date;
        const cdy = format(cd, "yyyy");
        const cdM = format(cd, "MM");
        const cdd = format(cd, "dd");

        const sd = input.xlsx[0]?.startDate as Date;
        const ed = input.xlsx[0]?.endDate as Date;
        const od = input.xlsx[0]?.openDate as Date;

        // const sd = input.xlsx[0]?.charges.map((i:any)=>`${i.users.id}${i.users.username}`)

        const c = input.cost?.toString();
        const p = input.profit?.toString();
        const o = input.outbound?.toString();
        const ww = input.xlsx[0]?.charges
          .map((i) => {
            return `${i.users.id}${i.users.username} `;
          })
          .join("");

        ws.getCell("M2").value = input.xlsx[0]?.id;

        ws.getCell("AJ2").value = (Number(cdy) - 1911).toString();
        ws.getCell("AM2").value = cdM;
        ws.getCell("AP2").value = cdd;

        ws.getCell("H4").value =
          input.xlsx[0]?.companyTypes[0]?.company.c_title;

        ws.getCell("A11").value =
          input.xlsx[0]?.companyTypes[0]?.company.c_title;

        ws.getCell("I11").value = main_amount;

        if (installPayload != undefined) {
          for (let i = 0; i < iLength; i++) {
            ws.getCell(`O${11 + i}`).value = installPayload[i]?.ok ? "ok" : "";
            ws.getCell(`P${11 + i}`).value = `${installPayload[i]?.percent}%`;
          }
        }

        if (secComypany != undefined) {
          for (let i = 0; i < secComypany.length; i++) {
            ws.getCell(`W${11 + i * 2}`).value = secComypany[i]?.company.c_name;
            ws.getCell(`AE${11 + i * 2}`).value =
              secComypany[i]?.amount != undefined
                ? numberWithCommas(secComypany[i]?.amount as number)
                : "";
            ws.getCell(`AL${11 + i * 2}`).value =
              secComypany[i]?.notes != undefined ? secComypany[i]?.notes : "";
            ws.getCell(`AE${12 + i * 2}`).value =
              secComypany[i]?.cutPayment != 0
                ? `-${numberWithCommas(secComypany[i]?.cutPayment as number)}`
                : "";
          }
        }

        ws.getCell("R4").value = input.xlsx[0]?.locations.location_name;
        ws.getCell("Z4").value = input.xlsx[0]?.task_name;
        ws.getCell("AL4").value = ww;
        ws.getCell("H5").value = main_amount;
        ws.getCell("R5").value = input.xlsx[0]?.p.toString();
        ws.getCell("Z5").value = numberWithCommas(
          Number(input.xlsx[0]?.pValue)
        );
        ws.getCell("AF5").value = input.xlsx[0]?.adapt;
        ws.getCell("D6").value = `${format(sd, "yyyy.MM.dd")}~${format(
          ed,
          "MM.dd"
        )}`;
        // ws.getCell("").value=input.xlsx[0]?
        ws.getCell("V6").value = `${format(od, "yyyy.MM.dd")}`;

        ws.getCell("I33").value = main_amount;
        ws.getCell("AL35").value = main_amount;
        ws.getCell("AE33").value = numberWithCommas(
          Number(c === undefined ? 0 : c)
        );
        ws.getCell("V35").value = numberWithCommas(
          Number(c === undefined ? 0 : c)
        );
        ws.getCell("AE35").value = numberWithCommas(
          Number(p === undefined ? 0 : p)
        );
        ws.getCell("AC35").value = o === undefined ? "" : `${o}%`;
        ws.getCell("AL39").value = `NT$${main_amount}`;
      });

      const Xdata = await wb.xlsx.writeBuffer();

      return {
        xlsxPayload: Buffer.from(Xdata).toString("base64"),
      };
    },
  })
  .query("dashboard", {
    resolve: async ({ ctx }) => {
      // const ac = await ctx.prisma.companyType.aggregate({
      //   _sum: {
      //     amount: true,
      //     cutPayment: true,
      //   },
      // });
      // const a = numberWithCommas(Number(ac._sum.amount));
      // const c = numberWithCommas(Number(ac._sum.cutPayment));
      // const p = numberWithCommas(
      //   Number(ac._sum.amount) - Number(ac._sum.cutPayment)
      // );


      const allTask = await ctx.prisma.task.findMany({
        select:{
          id:true,
          companyTypes:{
            select:{
              amount:true,
              cutPayment:true
            }
          }
        }
      })

      const a =allTask.map(i=>{
        return Number(i.companyTypes[0]?.amount)-Number(i.companyTypes[0]?.cutPayment);
      })


    const c =allTask.map((i) => {
      return i.companyTypes.slice(1).reduce((acc, curr) => {
        return acc + Number(curr.amount) - Number(curr.cutPayment);
      }, 0);
    })

  
const aSum = a.reduce((prev,curr)=>{return prev+curr})
const cSum = c.reduce((prev,curr)=>{return prev+curr})
const pSum = aSum-cSum


const chartPayload = allTask.map((i,j)=>{
  return {id:i.id,total:a[j],cost:c[j]}
})



      return { aSum, cSum, pSum,chartPayload };
    },
  });
