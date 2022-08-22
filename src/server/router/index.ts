// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { adminRouter} from "./admin-router";
import { userRouter } from "./user-router";



export const appRouter = createRouter()
  .transformer(superjson)
  // .merge("temp.",tempRouter)
  .merge("user.",userRouter)
  .merge("admin.", adminRouter)

 

// export type definition of API
export type AppRouter = typeof appRouter;
