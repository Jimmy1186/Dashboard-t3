import { adminProtectedRouter } from "./protected-router";
import argon2 from "argon2";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "./context";

// export const tempRouter = createRouter()
//   .mutation("inertOneUser", {
//     input: z.object({
//       id: z.string(),
//       username: z.string(),
//       role: z.object({
//         roles: z.string(),
//       }),
//       password: z.string(),
//     }),
//     output: z.object({
//       msg: z.string(),
//       alertStatus: z.string(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       const sameUserError = new trpc.TRPCError({
//         code: "CONFLICT",
//         message: "已有使用者使用該名稱",
//       });
//       try {
//         const existUserName = await ctx.prisma.user.count({
//           where: {
//             username: input.username,
//           },
//         });

//         const existUserId = await ctx.prisma.user.count({
//           where: {
//             id: input.id,
//           },
//         });

//         if (existUserName != 0 || existUserId != 0) {
//           return { alertStatus: "warn", msg: "已有使用者使用該名稱" };
//         }
//         const hash = await argon2.hash(input.password);

//         await ctx.prisma.user.create({
//           data: {
//             id: input.id,
//             username: input.username,
//             password: hash,
//             role: {
//               connect: {
//                 roles: input.role.roles,
//               },
//             },
//             // roleId:input.role.roles
//           },
//         });

//         return { alertStatus: "success", msg: "新增成功" };
//       } catch (e) {
//         console.log(e);
//         if (e != sameUserError) {
//           console.log(e);
//           return { alertStatus: "error", msg: "後端出狀況 請聯絡工程師" };
//         }
//         throw e;
//       }
//     },
//   })
//   .mutation("editUser", {
//     input: z.object({
//       id: z.string(),
//       username: z.string().or(z.undefined()),
//       role: z
//         .object({
//           roles: z.string(),
//         })
//         .or(z.undefined()),
//     }),
//     resolve: async ({ ctx, input }) => {
//       try {
//         await ctx.prisma.user.update({
//           where: {
//             id: input.id,
//           },
//           data: {
//             username: input.username || undefined,
//             role:
//               input.role === undefined
//                 ? undefined
//                 : {
//                     connect: {
//                       roles: input.role.roles,
//                     },
//                   },
//           },
//         });
//         return { alertStatus: "success", msg: "修改成功" };
//       } catch (e) {
//         return { alertStatus: "error", msg: "後端出狀況 請聯絡工程師" };
//       }
//     },
//   });

// Example router with queries that can only be hit if the user requesting is signed in
export const adminRouter = adminProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("findAllUser", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: {
            select: {
              roles: true,
            },
          },
        },
      });
    },
  })
  .mutation("deleteUser", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("inertOneUser", {
    input: z.object({
      id: z.string(),
      username: z.string(),
      role: z.object({
        roles: z.string(),
      }),
      password: z.string(),
    }),
    output: z.object({
      msg: z.string(),
      alertStatus: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const sameUserError = new trpc.TRPCError({
        code: "CONFLICT",
        message: "已有使用者使用該名稱",
      });
      try {
        const existUserName = await ctx.prisma.user.count({
          where: {
            username: input.username,
          },
        });

        const existUserId = await ctx.prisma.user.count({
          where: {
            id: input.id,
          },
        });

        if (existUserName != 0 || existUserId != 0) {
          return { alertStatus: "warn", msg: "已有使用者使用該名稱" };
        }
        const hash = await argon2.hash(input.password);

        await ctx.prisma.user.create({
          data: {
            id: input.id,
            username: input.username,
            password: hash,
            role: {
              connect: {
                roles: input.role.roles,
              },
            },
            // roleId:input.role.roles
          },
        });

        return { alertStatus: "success", msg: "新增成功" };
      } catch (e) {
        console.log(e);
        if (e != sameUserError) {
          console.log(e);
          return { alertStatus: "error", msg: "後端出狀況 請聯絡工程師" };
        }
        throw e;
      }
    },
  })
  .mutation("editUser", {
    input: z.object({
      id: z.string(),
      username: z.string().or(z.undefined()),
      role: z
        .object({
          roles: z.string(),
        })
        .or(z.undefined()),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            username: input.username || undefined,
            role:
              input.role === undefined
                ? undefined
                : {
                    connect: {
                      roles: input.role.roles,
                    },
                  },
          },
        });
        return { alertStatus: "success", msg: "修改成功" };
      } catch (e) {
        return { alertStatus: "error", msg: "後端出狀況 請聯絡工程師" };
      }
    },
  });