import { Gender, PatientEntry } from "./types";

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(x => x.toString()).includes(gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {

  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender incorrect or missing');
  }

  return gender;
  
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Type incorrect or missing');
  }
  return text;
};
 
const toNewPatientEntry = (data: unknown): PatientEntry => {

  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in data && 'dateOfBirth' in data && 'ssn' in data && 'gender' in data && 'occupation' in data) {
    
    const newPatient: PatientEntry = {
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
