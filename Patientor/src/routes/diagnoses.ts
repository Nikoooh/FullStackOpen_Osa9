import express from 'express';
import diagnosesData from '../../data/diagnosesData';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  try {
    res.status(200).json(diagnosesData);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "error " + error});
  }
});

export default diagnosesRouter;
