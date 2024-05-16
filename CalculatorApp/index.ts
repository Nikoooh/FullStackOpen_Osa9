import express from 'express';
import calculateBmi from './calculators/bmiCalculator';
import calculateExercises from './calculators/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: express.Request, res: express.Response) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req: express.Request, res: express.Response) => {

  try {
    if (!isNaN(Number(req.query.heigth)) && !isNaN(Number(req.query.weigth))) {
      const weigth = Number(req.query.weigth);
      const heigth = Number(req.query.heigth);
      const message = calculateBmi(heigth, weigth);
      res.status(200).json({weigth: weigth, heigth: heigth, bmi: message});
    } else {
      res.status(400).json({error: 'malformatted parameters'});
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/exercises', (req: express.Request, res: express.Response) => {
  try {  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { trainings, target } = req.body;

    if (isNaN(Number(target)) || !Array.isArray(trainings) || !trainings.every(item => typeof item === "number")) {
      res.status(400).json({error: 'malformatted input'});
    }

    const typedTrainings = trainings as number[];
    const typedTarget = target as number;

    const result = calculateExercises(typedTrainings, typedTarget);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'server error'});
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});