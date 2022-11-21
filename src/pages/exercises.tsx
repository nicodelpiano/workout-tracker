import { NextPage } from "next";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();

  const { mutate, error } = trpc.exercise.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: ExerciseInput) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="exercise_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("name")}
          />
        </div>
        <div>
          <label
            htmlFor="muscle"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Muscle
          </label>
          {/* <Example {...register("muscle")} /> */}
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("muscle")}
          >
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="shoulders">Shoulders</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="level"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Level
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("level")}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="exercise_type"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("exerciseType")}
          >
            <option value="cardio">Cardio</option>
            <option value="plyometrics">Plyometrics</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="strength">Strength</option>
            <option value="stretching">Stretching</option>
            <option value="strongman">Strongman</option>
          </select>
        </div>
      </div>
      <button
        className="block w-20 rounded-lg border border-emerald-700 bg-emerald-500 p-2.5 text-sm"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

const ExercisesPage: NextPage = () => {
  return (
    <div className="container min-h-screen pl-3">
      <h1 className="font-extrabold leading-normal text-white md:text-[3rem]">
        Exercises
      </h1>
      <h2 className="font-extrabold leading-normal text-white md:text-[2rem]">
        Add new
      </h2>
      <div className="pt-6">
        <Form />
        <form
          method="get"
          action="/exercises"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.exercise_name.value);
          }}
        >
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="exercise_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="exercise_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Bench press, dips, squats..."
                required
              />
            </div>

            {/* <div>
              <label
                htmlFor="exercise_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <MyMenu />
            </div> */}
            <div>
              <label
                htmlFor="muscle"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Muscle
              </label>
              <Example />
            </div>
          </div>

          <button
            className="rounder-lg block w-full border border-gray-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExercisesPage;

import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { ExerciseInput } from "../server/trpc/router/exercise";

type People = {
  name: string;
  id: number;
};

const people: People[] = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export function Example({ props }) {
  const [selected, setSelected] = useState<People[]>([]);

  const selectedClassName =
    "block w-full rounded-lg border text-left border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";
  const placeholderClassName =
    "block w-full rounded-lg border text-left border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  const hasSelection = selected.length > 0;

  return (
    <div>
      <Listbox value={selected} onChange={setSelected} multiple>
        <div className="relative mt-1">
          <Listbox.Button
            // className="relative w-full cursor-default rounded-lg bg-white p-2.5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            className={hasSelection ? selectedClassName : placeholderClassName}
          >
            {hasSelection
              ? selected.map((selection) => selection?.name).join(", ")
              : "Search here"}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
