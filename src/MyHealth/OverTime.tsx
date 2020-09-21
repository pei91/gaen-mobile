import React, { FunctionComponent } from "react"
import { View } from "react-native"
import { useTranslation } from "react-i18next"

import { useSymptomLogContext } from "./SymptomLogContext"
import { HealthAssessment, SymptomLogEntry, Symptom } from "./symptoms"
import { GlobalText } from "../components"
import { Posix, posixToDayjs } from "../utils/dateTime"

type SymptomsListProps = {
  symptoms: Symptom[]
  timestamp: Posix
}

const SymptomsList: FunctionComponent<SymptomsListProps> = ({
  symptoms,
  timestamp,
}) => {
  if (symptoms.length === 0) {
    return null
  }
  const dayJsDate = posixToDayjs(timestamp)

  return (
    <>
      {dayJsDate && <GlobalText>{dayJsDate.format("HH:mm")}</GlobalText>}
      {symptoms.map((symptom) => {
        return <GlobalText key={symptom}>{symptom}</GlobalText>
      })}
    </>
  )
}

type LogEntryProps = {
  logEntry: SymptomLogEntry
}

const LogEntry: FunctionComponent<LogEntryProps> = ({
  logEntry: { healthAssessment, date, symptoms },
}) => {
  const { t } = useTranslation()
  const healthAssessmentText =
    healthAssessment === HealthAssessment.AtRisk
      ? t("my_health.symptom_log.feeling_not_well")
      : t("my_health.symptom_log.feeling_well")
  const dayJsDate = posixToDayjs(date)

  return (
    <>
      {dayJsDate && <GlobalText>{dayJsDate.format("YYYY-MM-DD")}</GlobalText>}
      <GlobalText>{healthAssessmentText}</GlobalText>
      <SymptomsList symptoms={symptoms} timestamp={date} />
    </>
  )
}

const OverTime: FunctionComponent = () => {
  const { logEntries } = useSymptomLogContext()

  return (
    <View>
      {logEntries.map((logEntry) => {
        return <LogEntry key={logEntry.id} logEntry={logEntry} />
      })}
    </View>
  )
}

export default OverTime
