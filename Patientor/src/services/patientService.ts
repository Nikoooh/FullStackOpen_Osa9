import patientData from "../data/patientData";
import { Patient, NewPatientEntry, PatientReturnData, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientReturnData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {

  const patient = patientData.filter((patient) => patient.id === id);
  return patient[0];

};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patientData.push(newPatient);
  return newPatient;

};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };  

  patient.entries.push(newEntry);
  return newEntry;
  
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};