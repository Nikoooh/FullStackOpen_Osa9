import patientData from "../../data/patientData";
import { Patient, PatientEntry, PatientReturnData } from "../types";
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

const addPatient = (patient: PatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;

};

export default {
  getPatients,
  addPatient
};