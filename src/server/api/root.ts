import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { teamRouter } from "./routers/team";
import { coreRouter } from "./routers/core";
import { eventRouter } from "./routers/event";
import { certificateRouter } from "./routers/certificate";
import { registrationRouter } from "./routers/registrations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  userRouter,
  teamRouter,
  coreRouter,
  eventRouter,
  certificateRouter,
  registrationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
