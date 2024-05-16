import { parseExerciseArgs } from "./parseArgs";
import calculateExercises from "../exerciseCalculator";

try {
  const { target, trainingDays } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(trainingDays, target));
} catch (error) {
  console.log(error);
}