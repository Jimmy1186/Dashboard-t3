import { adminProtectedRouter } from "./protected-router";
import argon2  from "argon2";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "./context";


export const tempRouter = createRouter()
.mutation("inertOneUser", {
  input: z.object({
    id:z.string(),
    username: z.string(),
    role: z.number(),
    password: z.string(),
  }),
  output:z.object({
    msg:z.string(),
    alertStatus:z.string()
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

      if (existUserName != 0 || existUserId!=0) {
        return {alertStatus:"warn",msg:"已有使用者使用該名稱"}
      }
      const hash = await argon2.hash(input.password)
      
      await ctx.prisma.user.create({
        data:{
          id:input.id,
          username:input.username,
          password:hash,
          roleId:input.role
        }
      })
      
      return {alertStatus:"success",msg:"新增成功"}
    } catch (e) {
      console.log(e)
      if (e != sameUserError) {
        console.log(e)
        return {alertStatus:"error",msg:"後端出狀況 請聯絡工程師"}
        
      }
      throw e
    }
  },
})
// Example router with queries that can only be hit if the user requesting is signed in
export const adminRouter = adminProtectedRouter()
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
      id:z.string(),
      username: z.string(),
      role: z.number(),
      password: z.string(),
    }),
    output:z.object({
      msg:z.string(),
      alertStatus:z.string()
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

        if (existUserName != 0 || existUserId!=0) {
          return {alertStatus:"warn",msg:"已有使用者使用該名稱"}
        }
        const hash = await argon2.hash(input.password)
        
        await ctx.prisma.user.create({
          data:{
            id:input.id,
            username:input.username,
            password:hash,
            roleId:input.role
          }
        })
        
        return {alertStatus:"success",msg:"新增成功"}
      } catch (e) {
        console.log(e)
        if (e != sameUserError) {
          console.log(e)
          return {alertStatus:"error",msg:"後端出狀況 請聯絡工程師"}
          
        }
        throw e
      }
    },
  })
 

