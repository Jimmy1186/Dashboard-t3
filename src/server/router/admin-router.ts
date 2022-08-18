import { createProtectedRouter } from "./protected-router";
import argon2  from "argon2";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "./context";


// export const tempRouter = createRouter()
// .mutation("inertOneUser", {
//   input: z.object({
//     username: z.string(),
//     role: z.number(),
//     password: z.string(),
//   }),
//   resolve: async ({ input, ctx }) => {
//     const sameUserError = new trpc.TRPCError({
//       code: "CONFLICT",
//       message: "已有使用者使用該名稱",
//     });
//     try {
//       let existUser = await ctx.prisma.user.count({
//         where: {
//           username: input.username,
//         },
//       });

//       if (existUser != 0) {
//         throw sameUserError;
//       }
//       const hash = await argon2.hash(input.password)
//       console.log(input)
//       return await ctx.prisma.user.create({
//         data:{
//           username:input.username,
//           password:hash,
//           roleId:input.role
//         }
//       });
//     } catch (e) {
 
//       // if (e != sameUserError) {
//       //   throw new trpc.TRPCError({
//       //     code: "INTERNAL_SERVER_ERROR",
//       //     message: "後端出狀況 請聯絡工程師",
//       //     cause: e,
//       //   });
//       // }
//       throw e
//     }
//   },
// })


// Example router with queries that can only be hit if the user requesting is signed in
export const adminRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("findAllUser", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.user.findMany();
    },
  })

 
  .mutation("inertOneUser", {
    input: z.object({
      username: z.string(),
      role: z.number(),
      password: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const sameUserError = new trpc.TRPCError({
        code: "CONFLICT",
        message: "已有使用者使用該名稱",
      });
      try {
        let existUser = await ctx.prisma.user.count({
          where: {
            username: input.username,
          },
        });

        if (existUser != 0) {
          throw sameUserError;
        }
        const hash = await argon2.hash(input.password)
        
        return await ctx.prisma.user.create({
          data:{
            username:input.username,
            password:hash,
            roleId:input.role
          }
        });
      } catch (e) {
   
        if (e != sameUserError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "後端出狀況 請聯絡工程師",
            cause: e,
          });
        }
        throw e
      }
    },
  })
 

