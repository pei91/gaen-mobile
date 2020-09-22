import { Posix, beginningOfDay } from "../utils/dateTime"

export enum HealthAssessment {
  AtRisk,
  NotAtRisk,
}

export enum Feeling {
  Great,
  NotGreat,
}

export type Symptom = string

export enum CheckInStatus {
  NotCheckedIn,
  FeelingGood,
  FeelingNotWell,
}

export type DailyCheckIn = {
  date: Posix
  status: CheckInStatus
}

export type SymptomLogEntry = {
  date: Posix
  id: string
  symptoms: Symptom[]
}

type LogData = {
  checkIn: DailyCheckIn | null
  logEntries: SymptomLogEntry[]
}

type LogDataPerDay = Record<Posix, LogData>

export type DailyLogData = LogData & {
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

type WithADate = { date: Posix }
const compareDates = (
  { date: dateLeft }: WithADate,
  { date: dateRight }: WithADate,
) => {
  return dateLeft < dateRight ? -1 : 1
}

export const groupLogEntriesDaily = (
  allEntries: SymptomLogEntry[],
): LogDataPerDay => {
  const groupedEntries: LogDataPerDay = {}
  allEntries.forEach((entry) => {
    const { date } = entry
    const entryDateBeginningOfDay = beginningOfDay(date)
    if (groupedEntries[entryDateBeginningOfDay]) {
      const newLogEntries = groupedEntries[entryDateBeginningOfDay].logEntries
      newLogEntries.push(entry)
      newLogEntries.sort(compareDates)
      groupedEntries[entryDateBeginningOfDay].logEntries = newLogEntries
    } else {
      groupedEntries[entryDateBeginningOfDay] = {
        logEntries: [entry],
        checkIn: null,
      }
    }
  })

  return groupedEntries
}

export const serializeDailyLog = (
  logData: LogDataPerDay,
  dailyCheckIns: DailyCheckIn[],
): DailyLogData[] => {
  dailyCheckIns.forEach((checkIn) => {
    const { date } = checkIn
    const checkInBeginningOfDay = beginningOfDay(date)
    if (logData[checkInBeginningOfDay]) {
      logData[checkInBeginningOfDay].checkIn = checkIn
    } else {
      logData[checkInBeginningOfDay] = {
        logEntries: [],
        checkIn,
      }
    }
  })
  return Object.keys(logData).map((date: Posix) => {
    return {
      date,
      ...logData[date],
    }
  })
}
