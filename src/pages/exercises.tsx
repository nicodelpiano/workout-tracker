import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { FieldValues, useForm } from "react-hook-form";
import { ExerciseInput, exerciseSchema } from "../server/models/exercise";
import { trpc } from "../utils/trpc";

const ExercisesPage: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(exerciseSchema),
  });

  const { mutate } = trpc.exercise.create.useMutation({
    onError: (error) => {
      console.log({ error });
    },
  });

  console.log({ errors });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    mutate(data as ExerciseInput);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[660px] w-[680px] flex-col items-center justify-center gap-2 bg-white px-24 drop-shadow-md">
        <h2 className="text-center text-3xl font-semibold">
          🏋️ Create exercise
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center"
        >
          <div className="mt-5 mb-5 w-full">
            <div className="grid grid-cols-1">
              <div>
                <label>Name</label>
                <input type="text" className="w-full" {...register("name")} />
                <span className="mt-1 block h-6 text-sm text-red-500">
                  {errors.name?.message && errors.name?.message.toString()}
                </span>
              </div>
              <div>
                <label className="block">Muscle</label>
                <select className="w-full" {...register("muscle")}>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="shoulders">Shoulders</option>
                </select>
                <span className="mt-1 block h-6 text-sm text-red-500">
                  {errors.muscle?.message && errors.muscle?.message.toString()}
                </span>
              </div>
              <div>
                <label className="block">Type</label>
                <select className="w-full" {...register("exerciseType")}>
                  <option value="cardio">Cardio</option>
                  <option value="plyometrics">Plyometrics</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="strength">Strength</option>
                  <option value="stretching">Stretching</option>
                  <option value="strongman">Strongman</option>
                </select>
                <span className="mt-1 block h-6 text-sm text-red-500">
                  {errors.exerciseType?.message &&
                    errors.exerciseType?.message.toString()}
                </span>
              </div>
              <div>
                <label className="block">Level</label>
                <select className="w-full" {...register("level")}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <span className="mt-1 block h-6 text-sm text-red-500">
                  {errors.level?.message && errors.level?.message.toString()}
                </span>
              </div>
            </div>
          </div>
          <button
            disabled={Object.keys(errors).length > 0}
            className="mt-4 block w-20 rounded-lg border border-emerald-700 bg-emerald-500 p-2.5 text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExercisesPage;
