import { publicProcedure, t } from "../trpc";
import { z } from "zod";

export const exerciseRouter = t.router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        level: z.string(),
        // muscle: z.array(z.string()).optional(),
        exerciseType: z.array(z.string()).optional(),
        equipment: z.array(z.string()).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.exercise.create({
        data: input,
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
