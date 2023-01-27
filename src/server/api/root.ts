import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { teamRouter } from "./routers/team";
import { coreRouter } from "./routers/core";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  userRouter,
  teamRouter,
  coreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
