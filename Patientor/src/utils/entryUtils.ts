import { EntryWithoutId } from "../types";
import { parseString, parseDiagnosisCodes, parseHealthCheckRating, parseSickLeave, parseDischarge } from "./functions";

const toNewEntry = (data: unknown): EntryWithoutId => {
  if (!data || typeof data !== 'object') {
    throw new Error('Entry missing or incorrect');
  }

  if ('description' in data && 'date' in data && 'specialist' in data && 'type' in data) {
    switch (data.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in data ) {
          const newEntry: EntryWithoutId = {
            description: parseString(data.description),
            date: parseString(data.date),
            specialist: parseString(data.specialist),
            type: data.type,
            healthCheckRating: parseHealthCheckRating(data.healthCheckRating)
          };

          if ('diagnosisCodes' in data) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(data.diagnosisCodes);
          }

          return newEntry;
        }

        break;
      
      case 'OccupationalHealthcare':
        if ('employerName' in data) {   
          const newEntry: EntryWithoutId = {
            description: parseString(data.description),
            date: parseString(data.date),
            specialist: parseString(data.specialist),
            type: data.type,
            employerName: parseString(data.employerName)           
          };

          if ('diagnosisCodes' in data) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(data.diagnosisCodes);
          }

          if ('sickLeave' in data) {
            newEntry.sickLeave = parseSickLeave(data.sickLeave);
          }
          
          return newEntry;
        }
        break;
    
      case 'Hospital': 
        if ('diagnosisCodes' in data && 'discharge' in data) {
          const newEntry = {
            description: parseString(data.description),
            date: parseString(data.date),
            specialist: parseString(data.specialist),
            type: data.type,
            dianosisCodes: parseDiagnosisCodes(data.diagnosisCodes),
            discharge: parseDischarge(data.discharge)
          };
          return newEntry;
        }
        break;

      default:
        throw new Error('Unknown entry type');
    }
  } 
    
  throw new Error('Entry fields missing');
  
};

export default toNewEntry;