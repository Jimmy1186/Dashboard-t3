import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";


export const addRouter = createProtectedRouter()
.mutation("company",{
    input:z.object({
        name:z.string(),
        title:z.string(),
        tax:z.string()
    }),
    output:z.object({
        msg:z.string(),
        alertStatus:z.string()
      }),
      resolve: async ({ ctx, input }) => {
        const {...rest}=input

        let existColumn = await ctx.prisma.company.count({
            where:{
               OR:[
                {
                    name:input.name
                },
                {
                    title:input.title
                },
                {
                    tax:input.tax
                }
               ]
            },   
        }).then(res=>{return res})
  
        
        if(existColumn!=0){
            return {msg:"已有該公司",alertStatus:"warn"}
        }



        await ctx.prisma.company.create({
            data:{
                ...rest
            }
        })

        return {msg:"新增成功",alertStatus:"success"}
    }
})