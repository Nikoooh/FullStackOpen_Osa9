interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseArguments {
  trainingDays: number[],
  target: number
}

const calculateExercises = (trainings: number[], target: number): Result => {
   
  const period: number = trainings.length
  const trainingAvg: number = trainings.reduce((x, y) => x + y, 0) / period
  
  let rating: number
  let description: string

  if (trainingAvg < target) {
    if (Math.abs(trainingAvg - target) >= 2) {
      rating = 1
      description = "You missed the target by over 2 hours"
    } else {
      rating = 2
      description = "You almost did it!"
    }
  } else {
    rating = 3
    description = "You achieved the target! Well done"
  }

  const result: Result = {
    periodLength: period,
    trainingDays: trainings.filter(x => x !== 0).length,
    success: trainingAvg > target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: trainingAvg
  }

  return result
}

const parseArgs = (args: any[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('too few arguments')
  const target = args[2]
  const trainings = args.slice(3)

  const isArrOfIntegers = (arr: string[]): boolean => {
    return arr.every((item) => !isNaN(Number(item)))
  }

  if (!isNaN(Number(target)) && isArrOfIntegers(trainings)) {
    return {
      target: Number(target),
      trainingDays: trainings.map(Number) 
    }
  } else {
    throw new Error('enter only numbers')
  }
}

try {
  const { target, trainingDays } = parseArgs(process.argv)
  console.log(calculateExercises(trainingDays, target))
} catch (error) {
  console.log(error);
}
