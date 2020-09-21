import React from "react"
import { render } from "@testing-library/react-native"

import { SymptomLogContext } from "./SymptomLogContext"
import { HealthAssessment } from "./symptoms"

import OverTime from "./OverTime"
import { factories } from "../factories"

jest.mock("@react-navigation/native")

describe("OverTime", () => {
  describe("when the user has a not at risk log entry", () => {
    it("shows the correct message, and a date", () => {
      const dateString = "2020-09-21"
      const logEntryPosix = Date.parse(`${dateString} 10:00`)
      const { getByText } = render(
        <SymptomLogContext.Provider
          value={factories.symptomLogContext.build({
            logEntries: [
              {
                id: 1,
                symptoms: [],
                healthAssessment: HealthAssessment.NotAtRisk,
                date: logEntryPosix,
              },
            ],
          })}
        >
          <OverTime />
        </SymptomLogContext.Provider>,
      )

      expect(getByText("You were feeling well")).toBeDefined()
      expect(getByText(dateString)).toBeDefined()
    })
  })

  describe("when the user has an at risk log entry", () => {
    it("shows the correct message, date and symptoms", () => {
      const dateString = "2020-09-21"
      const timeString = "10:00"
      const logEntryPosix = Date.parse(`${dateString} ${timeString}`)
      const coughSymptom = "cough"
      const lossOfSmellSymptom = "loss_of_smell"
      const symptoms = [coughSymptom, lossOfSmellSymptom]
      const { getByText } = render(
        <SymptomLogContext.Provider
          value={factories.symptomLogContext.build({
            logEntries: [
              {
                id: 1,
                symptoms,
                healthAssessment: HealthAssessment.AtRisk,
                date: logEntryPosix,
              },
            ],
          })}
        >
          <OverTime />
        </SymptomLogContext.Provider>,
      )

      expect(getByText("You were not feeling well")).toBeDefined()
      expect(getByText(dateString)).toBeDefined()
      expect(getByText(timeString)).toBeDefined()
      expect(getByText(coughSymptom)).toBeDefined()
      expect(getByText(lossOfSmellSymptom)).toBeDefined()
    })
  })
})
