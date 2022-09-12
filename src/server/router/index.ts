// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { adminRouter,tempRouter} from "./admin-router";
import { userRouter } from "./user-router";
import { addRouter } from "./add-router";
import { guestRouter } from "./guest-router";



export const appRouter = createRouter()
  .transformer(superjson)
  .merge("guest.",guestRouter)
  .merge("temp.",tempRouter)
  .merge("add.",addRouter)
  .merge("user.",userRouter)
  .merge("admin.", adminRouter)

 

// export type definition of API
export type AppRouter = typeof appRouter;
