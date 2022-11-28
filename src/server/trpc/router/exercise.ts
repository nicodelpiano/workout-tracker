import { publicProcedure, t } from "../trpc";
import { exerciseSchema } from "../../models/exercise";

export const exerciseRouter = t.router({
  create: publicProcedure.input(exerciseSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.exercise.create({
      data: input,
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
