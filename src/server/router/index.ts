// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { adminRouter,tempRouter } from "./admin-router";



export const appRouter = createRouter()
  .transformer(superjson)
  .merge("temp.",tempRouter)
  .merge("admin.", adminRouter)

 

// export type definition of API
export type AppRouter = typeof appRouter;
