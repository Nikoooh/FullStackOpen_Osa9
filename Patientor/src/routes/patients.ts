import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  try {
    res.status(200).json(patientService.getPatients());
  } catch (error) {
    res.status(500).json({error: "error" + error});
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error) {
    let errMessage = 'Error. Something went wrong';
    if (error instanceof Error) {
      errMessage = `Error: ${error.message}`;
    }
    res.status(400).send(errMessage);
  }
});

export default patientRouter;