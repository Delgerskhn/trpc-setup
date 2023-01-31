import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CreateUserInput,
  FilterQueryInput,
  ParamsInput,
  UpdateUserInput,
} from "~/lib/user/data/schemas/user.schema";

const prisma = new PrismaClient();

export const createUserController = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const User = await prisma.user.create({
      data: {
        ...input,
      },
    });

    return {
      status: "success",
      data: {
        User,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that title already exists",
        });
      }
    }
    throw error;
  }
};

export const updateUserController = async ({
  paramsInput,
  input,
}: {
  paramsInput: ParamsInput;
  input: UpdateUserInput["body"];
}) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: paramsInput.UserId },
      data: input,
    });

    return {
      status: "success",
      User: updatedUser,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that title already exists",
        });
      }
    }
    throw error;
  }
};

export const findUserController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const User = await prisma.user.findFirst({
      where: { id: paramsInput.UserId },
    });

    if (!User) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with that ID not found",
      });
    }

    return {
      status: "success",
      User,
    };
  } catch (error) {
    throw error;
  }
};

export const findAllUsersController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const Users = await prisma.user.findMany({ skip, take: limit });

    return {
      status: "success",
      results: Users.length,
      Users,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUserController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    await prisma.user.delete({ where: { id: paramsInput.UserId } });

    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User with that ID not found",
        });
      }
    }
    throw error;
  }
};
