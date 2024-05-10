interface BmiArguments {
  heigth: number
  weight: number
}

interface ExerciseArguments {
  trainingDays: number[],
  target: number
}

export const parseBmiArg = (args: string[]): BmiArguments => {
  if (args.length !== 4) throw new Error('incorrect argument count. please enter 2 arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heigth: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('provided values were not numbers');
  }
};

export const parseExerciseArgs = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('too few arguments');
  const trainings = args.slice(3);

  const isArrOfIntegers = (arr: string[]): boolean => {
    return arr.every((item) => !isNaN(Number(item)));
  };

  if (!isNaN(Number(args[2])) && isArrOfIntegers(trainings)) {
    return {
      target: Number(args[2]),
      trainingDays: trainings.map(Number) 
    };
  } else {
    throw new Error('enter only numbers');
  }
};
