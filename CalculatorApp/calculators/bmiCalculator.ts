
const calculateBmi = (heigth: number, weigth: number): string => {
  
  const meters: number = heigth / 100;
  const bmi: number = weigth / (meters * meters);

  if (bmi < 18.5) {
    return 'underweight (unhealthy weigth)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'normal (healthy weigth)';
  } else if (bmi >= 24.9 && bmi < 29.9) {
    return "overweight (unhealthy weigth)";
  } else {
    return "obese (unhealthy weigth)";
  }
    
};

export default calculateBmi;