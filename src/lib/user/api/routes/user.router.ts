import {
  createUserController,
  deleteUserController,
  findAllUsersController,
  findUserController,
  updateUserController,
} from "~/lib/user/api/controllers/user.controller";
import {
  createUserSchema,
  filterQuery,
  params,
  updateUserSchema,
} from "~/lib/user/data/schemas/user.schema";
import { router, publicProcedure } from "~/lib/shared/router";

export const userRouter = router({
  getHello: publicProcedure.query(() => {
    return {
      status: "success",
      message: "Hello World!",
    };
  }),
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => createUserController({ input })),
  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input }) =>
      updateUserController({ paramsInput: input.params, input: input.body })
    ),
  deleteUser: publicProcedure
    .input(params)
    .mutation(({ input }) => deleteUserController({ paramsInput: input })),
  getUser: publicProcedure
    .input(params)
    .query(({ input }) => findUserController({ paramsInput: input })),
  getUsers: publicProcedure
    .input(filterQuery)
    .query(({ input }) => findAllUsersController({ filterQuery: input })),
});
