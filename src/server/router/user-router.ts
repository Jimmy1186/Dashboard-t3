import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import argon2 from "argon2";


export const userRouter = createProtectedRouter()
  .query("userData", {
    input: z.object({
      userId: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
        select: {
          id: true,
          username: true,
        },
      });
    },
  })
  .mutation("updatePassword", {
    input: z.object({
      id: z.string(),
      oldPassword: z.string(),
      newPassword: z.string(),
    }),
    output:z.object({
      msg:z.string(),
      alertStatus:z.string()
    }),
    resolve: async ({ ctx, input }) => {
      

      // const unMatchError = new trpc.TRPCError({
      //   code: "CONFLICT",
      //   message: "密碼錯誤",
      // });
      const impossibleError = new trpc.TRPCError({
        code: "CONFLICT",
        message: "無此人或無密碼",
      });

      const oldHashPassword = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          password: true,
        },
      });

      if (!oldHashPassword) {
       throw impossibleError
    
      }
      const match = await argon2.verify(
        oldHashPassword.password,
        input.oldPassword
      );
      console.log(match)
      if (!match) {
        return {msg:"舊密碼錯誤",alertStatus:"warn"}
      }
      
      const newHash = await argon2.hash(input.newPassword)

 
      
      await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: newHash,
        },
      })

      return {msg:"更改成功",alertStatus:"success"}
    },
  });
