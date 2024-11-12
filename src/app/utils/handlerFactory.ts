import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import catchAsync from "./catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

type ModelName = "book" | "member" | "borrowRecord";
const prisma = new PrismaClient();
// Capitalizes the first character of a string
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
// Helper function to get primary key field based on model name
const getPrimaryKeyField = (modelName: ModelName) => {
  switch (modelName) {
    case "book":
      return "bookId";
    case "member":
      return "memberId";
    case "borrowRecord":
      return "borrowId";
    default:
      throw new Error("Invalid model name");
  }
};

export const deleteOne = (modelName: ModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = await (prisma[modelName] as any).delete({
      where: { [primaryKey]: req.params.id },
    });

    if (!doc) {
      return next(
        new AppError(httpStatus.NOT_FOUND, "No document found with that ID")
      );
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: `${capitalize(modelName)} deleted successfully`,
      data: doc,
    });
  });

export const updateOne = (modelName: ModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = await (prisma[modelName] as any).update({
      where: { [primaryKey]: req.params.id },
      data: req.body,
    });

    if (!doc) {
      return next(
        new AppError(httpStatus.NOT_FOUND, `${capitalize(modelName)} not found`)
      );
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: `${capitalize(modelName)} updated successfully`,
      data: doc,
    });
  });

export const createOne = (modelName: ModelName) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await (prisma[modelName] as any).create({
      data: req.body,
    });

    res.status(httpStatus.CREATED).json({
      success: true,
      status: httpStatus.CREATED,
      message: `${capitalize(modelName)} created successfully`,
      data: doc,
    });
  });

export const getOne = (modelName: ModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = await (prisma[modelName] as any).findUnique({
      where: { [primaryKey]: req.params.id },
    });

    if (!doc) {
      return next(
        new AppError(httpStatus.NOT_FOUND, `${capitalize(modelName)} not found`)
      );
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: `${capitalize(modelName)} retrieved successfully`,
      data: doc,
    });
  });

export const getAll = (modelName: ModelName) =>
  catchAsync(async (req: Request, res: Response) => {
    const docs = await (prisma[modelName] as any).findMany();

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: `${capitalize(modelName)}s retrieved successfully`,
      data: docs,
    });
  });
