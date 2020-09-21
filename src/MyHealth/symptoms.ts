import { Posix } from "../utils/dateTime"

export enum HealthAssessment {
  AtRisk,
  NotAtRisk,
}

export enum Feeling {
  Great,
  NotGreat,
}

export type Symptom = string

export type LogEntriesForDay = {
  dayStatus: Feeling
  date: Posix
  entriesForDay: SymptomLogEntry[]
}

export type DailyLogEntries = {
  generalFeeling: Feeling
  date: Posix
  entries: SymptomLogEntry[]
}

export type SymptomLogEntry = {
  id: number
  symptoms: Symptom[]
  healthAssessment: HealthAssessment
  date: Posix
}

export const determineHealthAssessment = (
  symptoms: Symptom[],
): HealthAssessment => {
  if (symptoms.length > 0) {
    return HealthAssessment.AtRisk
  }
  return HealthAssessment.NotAtRisk
}
