import { NewPatientEntry } from "../types";
import { parseGender, parseString } from "./functions";

const toNewPatientEntry = (data: unknown): NewPatientEntry => {

  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in data && 'dateOfBirth' in data && 'ssn' in data && 'gender' in data && 'occupation' in data) { 
    const newPatient: NewPatientEntry = {
      name: parseString(data.name),
      dateOfBirth: parseString(data.dateOfBirth),
      ssn: parseString(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseString(data.occupation)
    };

    return newPatient;
  }

  throw new Error("Field missing");
  
};

export default toNewPatientEntry;

