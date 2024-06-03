import { Diagnosis, Discharge, HealthCheckRating, SickLeave, Gender } from "../types";

// General

export const parseString = (text: unknown): string => {
  if (!text || !isString(text) || text.length <= 1) {
    throw new Error('Input incorrect or missing');
  }
  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Patient types

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(x => x.toString()).includes(gender);
};

export const parseGender = (gender: unknown): Gender => {

  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender incorrect or missing');
  }

  return gender;
  
};

// Entry types

export const parseDiagnosisCodes = (array: unknown): Array<Diagnosis['code']> =>  {
  if (!array || typeof array !== 'object') {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return array as Array<Diagnosis['code']>;
};

const isHealthcheckRating = (value: unknown): value is HealthCheckRating => {
  return typeof value === 'number' && Object.values(HealthCheckRating).includes(value);
};

export const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  
  if (value === undefined || !isHealthcheckRating(value)) {
    throw new Error(`Unexpected health rating: ${value}`);
  }

  return value;

};

const isSickLeave = (object: unknown): object is SickLeave => {
  return typeof object === 'object' && object !== null && 'startDate' in object && 'endDate' in object;
};

export const parseSickLeave = (object: unknown): SickLeave => {
  if (!isSickLeave(object) || !parseString(object.startDate) || !parseString(object.endDate)) {
    throw new Error('Unexpected sick leave values');
  }

  return object;

};

const isDischarge = (object: unknown): object is Discharge => {
  return typeof object === 'object' && object !== null && 'date' in object && 'criteria' in object;
};

export const parseDischarge = (object: unknown): Discharge => {
  if (!isDischarge(object) || !parseString(object.date) || !parseString(object.criteria)) {
    throw new Error('Unexpected discharge values');
  }

  return object;
};
