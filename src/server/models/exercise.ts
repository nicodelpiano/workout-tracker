import { z } from "zod";

const errorMap: z.ZodErrorMap = (error, ctx) => {
  const fieldName = error.path[0];
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      return {
        message: `${fieldName} must contain at least ${error.minimum} characters`,
      };
    default:
      return { message: ctx.defaultError };
  }
};

export const exerciseSchema = z.object({
  name: z.string({ errorMap }).max(80).min(6),
  level: z.string(),
  muscle: z.string(),
  exerciseType: z.string(),
  equipment: z.string().optional(),
});

export type ExerciseInput = z.infer<typeof exerciseSchema>;
