import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientUtils';
import toNewEntry from '../utils/entryUtils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  try {
    res.status(200).json(patientService.getPatients());
  } catch (error) {
    res.status(500).json({error: "error" + error});
  }
});

patientRouter.get('/:id', (req, res) => {
  try {

    const patient = patientService.getPatient(req.params.id);

    if (!patient) {
      throw new Error('No patients found with ID');
    }
    
    res.status(200).json(patient);

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message});
    } else {
      res.status(500).json({error: 'Unknown error. Try again later.'});
    }
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

patientRouter.post('/:id/entries', (req, res) => {
  try {

    const patient = patientService.getPatient(req.params.id);
    
    if (!patient) {
      throw new Error('No patient found');
    }

    const entry = toNewEntry(req.body);
    const newEntry = patientService.addEntry(patient, entry);

    res.status(200).json(newEntry);

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message});
    } else {
      res.status(500).json({error: 'unexpected error.'});
    }
  }
});

export default patientRouter;