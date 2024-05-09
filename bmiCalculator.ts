interface BmiArguments {
  heigth: number
  weight: number
}

const calculateBmi = (heigth: number, weigth: number): string => {
  const meters: number = heigth / 100
  const bmi: number = weigth / (meters * meters)

  if (bmi < 18.5) {
    return 'underweight (unhealthy weigth)'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'normal (healthy weigth)'
  } else if (bmi >= 24.9 && bmi < 29.9) {
    return "overweight (unhealthy weigth)";
  } else {
    return "obese (unhealthy weigth)";
  }
    
}

const parseArg = (args: string[]): BmiArguments => {
  if (args.length !== 4) throw new Error('incorrect argument count. please enter 2 arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heigth: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('provided values were not numbers')
  }
}

try {
  const { heigth, weight } = parseArg(process.argv)
  console.log(calculateBmi(heigth, weight))
} catch (error) {
  console.log(error);
}

