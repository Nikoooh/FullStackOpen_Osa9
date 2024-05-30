import { Diagnosis, Discharge, HealthCheckRating, SickLeave, Gender } from "../types";

// General

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Type incorrect or missing');
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

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthcheckRating = (value: unknown): value is HealthCheckRating => {
  return typeof value === 'string' && Object.values(HealthCheckRating).includes(value);
};

export const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!value || !isHealthcheckRating(value)) {
    throw new Error('Unexpected health rating');
  }

  return value;

};

const isSickLeave = (object: unknown): object is SickLeave => {
  return typeof object === 'object' && object !== null && 'startDate' in object && 'endDate' in object && isString(object.startDate) && isString(object.endDate);
};

export const parseSickLeave = (object: unknown): SickLeave => {
  if (!isSickLeave(object)) {
    throw new Error('Unexpected sick leave values');
  }

  return object;

};

const isDischarge = (object: unknown): object is Discharge => {
  return typeof object === 'object' && object !== null && 'date' in object && 'criteria' in object && isString(object.date) && isString(object.criteria);
};

export const parseDischarge = (object: unknown): Discharge => {
  if (!isDischarge(object)) {
    throw new Error('Unexpected discharge values');
  }

  return object;
};
