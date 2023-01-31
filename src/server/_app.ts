import { router } from "~/lib/shared/router";
import { userRouter } from "~/lib/user/api/routes/user.router";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
