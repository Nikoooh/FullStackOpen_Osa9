interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (trainings: number[], target: number): Result => {
   
  const period: number = trainings.length;
  const trainingAvg: number = trainings.reduce((x, y) => x + y, 0) / period;
  
  let rating: number;
  let description: string;

  if (trainingAvg < target) {
    if (Math.abs(trainingAvg - target) >= 2) {
      rating = 1;
      description = "You missed the target by over 2 hours";
    } else {
      rating = 2;
      description = "You almost did it!";
    }
  } else {
    rating = 3;
    description = "You achieved the target! Well done";
  }

  const result: Result = {
    periodLength: period,
    trainingDays: trainings.filter(x => x !== 0).length,
    success: trainingAvg > target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: trainingAvg
  };

  return result;
};

export default calculateExercises;