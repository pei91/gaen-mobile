import {
  groupLogEntriesDaily,
  serializeDailyLog,
  CheckInStatus,
} from "./symptoms"
import { beginningOfDay } from "../utils/dateTime"

describe("groupLogEntriesDaily", () => {
  it("returns a set of log entries grouped by day with entries sorted", () => {
    const firstDayDateString = "2020-09-21"
    const firstDayLogEntryOnePosix = Date.parse(`${firstDayDateString} 10:00`)
    const firstDayDatePosix = beginningOfDay(firstDayLogEntryOnePosix)
    const firstDayLogEntryOne = {
      id: "1",
      symptoms: ["symptom1", "symptom2"],
      date: firstDayLogEntryOnePosix,
    }
    const firstDayLogEntryTwoPosix = Date.parse(`${firstDayDateString} 12:00`)
    const firstDayLogEntryTwo = {
      id: "2",
      symptoms: ["symptom1"],
      date: firstDayLogEntryTwoPosix,
    }
    const secondDayDateString = "2020-09-22"
    const secondDayLogEntryOnePosix = Date.parse(`${secondDayDateString} 10:00`)
    const secondDayDatePosix = beginningOfDay(secondDayLogEntryOnePosix)
    const secondDayLogEntryOne = {
      id: "3",
      symptoms: ["symptom1"],
      date: secondDayLogEntryOnePosix,
    }
    const secondDayLogEntryTwoPosix = Date.parse(`${secondDayDateString} 12:00`)
    const secondDayLogEntryTwo = {
      id: "4",
      symptoms: ["symptom2"],
      date: secondDayLogEntryTwoPosix,
    }

    const thirdDayEntryDateString = "2020-09-23"
    const thirdDayLogEntryPosix = Date.parse(`${thirdDayEntryDateString} 12:00`)
    const thirdDayEntryDatePosix = beginningOfDay(thirdDayLogEntryPosix)
    const thirdDayEntry = {
      id: "5",
      symptoms: ["symptom2"],
      date: thirdDayLogEntryPosix,
    }
    expect(
      groupLogEntriesDaily([
        secondDayLogEntryTwo,
        thirdDayEntry,
        firstDayLogEntryOne,
        secondDayLogEntryOne,
        firstDayLogEntryTwo,
      ]),
    ).toEqual({
      [firstDayDatePosix]: {
        logEntries: [firstDayLogEntryOne, firstDayLogEntryTwo],
        checkIn: null,
      },
      [secondDayDatePosix]: {
        logEntries: [secondDayLogEntryOne, secondDayLogEntryTwo],
        checkIn: null,
      },
      [thirdDayEntryDatePosix]: {
        logEntries: [thirdDayEntry],
        checkIn: null,
      },
    })
  })
})

describe("serializeDailyLog", () => {
  it("sort and combine daily log entries with daily check ins", () => {
    const logEntryDateString = "2020-09-21"
    const logEntryDatePosix = Date.parse(`${logEntryDateString} 10:00`)
    const logEntryKeyDate = beginningOfDay(logEntryDatePosix)
    const logEntry = {
      id: "1",
      symptoms: ["symptom1", "symptom2"],
      date: logEntryDatePosix,
    }
    const logData = {
      [logEntryKeyDate]: { logEntries: [logEntry], checkIn: null },
    }
    const sameDateCheckInPosix = Date.parse(`${logEntryDateString} 12:00`)
    const sameDateCheckIn = {
      date: sameDateCheckInPosix,
      status: CheckInStatus.FeelingGood,
    }
    const earlierDateCheckInString = "2020-09-20"
    const earlierDateCheckInPosix = Date.parse(
      `${earlierDateCheckInString} 12:00`,
    )
    const earlierDateCheckInBeginningOfDay = beginningOfDay(
      earlierDateCheckInPosix,
    )
    const earlierDateCheckIn = {
      date: earlierDateCheckInPosix,
      status: CheckInStatus.FeelingGood,
    }
    const laterDateCheckInString = "2020-09-20"
    const laterDateCheckInPosix = Date.parse(`${laterDateCheckInString} 12:00`)
    const laterDateCheckInBeginningOfDay = beginningOfDay(laterDateCheckInPosix)
    const laterDateCheckIn = {
      date: laterDateCheckInPosix,
      status: CheckInStatus.FeelingNotWell,
    }

    expect(
      serializeDailyLog(logData, [
        sameDateCheckIn,
        laterDateCheckIn,
        earlierDateCheckIn,
      ]),
    ).toEqual([
      {
        date: earlierDateCheckInBeginningOfDay,
        checkIn: earlierDateCheckIn,
        logEntries: [],
      },
      {
        date: logEntryKeyDate,
        checkIn: sameDateCheckIn,
        logEntries: [logEntry],
      },
      {
        date: laterDateCheckInBeginningOfDay,
        checkIn: laterDateCheckIn,
        logEntries: [],
      },
    ])
  })
})
