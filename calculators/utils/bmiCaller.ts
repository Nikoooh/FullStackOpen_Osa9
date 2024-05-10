import { parseBmiArg } from "./parseArgs";
import calculateBmi from "../bmiCalculator";

try {
  const { heigth, weight } = parseBmiArg(process.argv);
  console.log(calculateBmi(heigth, weight));
} catch (error) {
  console.log(error);
}