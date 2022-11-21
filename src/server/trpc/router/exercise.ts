import { publicProcedure, t } from "../trpc";
import { z } from "zod";

const exerciseSchema = z.object({
  name: z.string(),
  level: z.string(),
  muscle: z.string(),
  exerciseType: z.string(),
  equipment: z.string().optional(),
});

export type ExerciseInput = z.infer<typeof exerciseSchema>;

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
