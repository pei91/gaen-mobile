import React, { FunctionComponent } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"

import { SelfScreenerStackScreens, useStatusBarEffect } from "../navigation"
import { Button, GlobalText } from "../components"

import { EmergencySymptom } from "./selfScreener"
import { useSelfScreenerContext } from "../SelfScreenerContext"
import SymptomCheckbox from "./SymptomCheckbox"

import { Buttons, Colors, Spacing, Typography } from "../styles"

const EmergencySymptomsQuestions: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.secondary10)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const { emergencySymptoms, updateSymptoms } = useSelfScreenerContext()
  const {
    CHEST_PAIN,
    SEVERE_DIFFICULTY_BREATHING,
    LIGHTHEADEDNESS,
    DISORIENTATION,
  } = EmergencySymptom

  const handleOnPressNext = () => {
    if (emergencySymptoms.length > 0) {
      return navigation.navigate(SelfScreenerStackScreens.CallEmergencyServices)
    }

    navigation.navigate(SelfScreenerStackScreens.NoEmergencySymptoms)
  }

  const emergencySymptomToString = (symptom: EmergencySymptom): string => {
    switch (symptom) {
      case EmergencySymptom.CHEST_PAIN:
        return t("self_screener.emergency_symptoms.chest_pain")
      case EmergencySymptom.SEVERE_DIFFICULTY_BREATHING:
        return t("self_screener.emergency_symptoms.difficulty_breathing")
      case EmergencySymptom.LIGHTHEADEDNESS:
        return t("self_screener.emergency_symptoms.lightheadedness")
      case EmergencySymptom.DISORIENTATION:
        return t("self_screener.emergency_symptoms.disorientation")
    }
  }

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.mainContentContainer}
        alwaysBounceVertical={false}
      >
        <GlobalText style={style.headerText}>
          {t("self_screener.emergency_symptoms.are_you_experiencing")}
        </GlobalText>
        <GlobalText style={style.subheaderText}>
          {t("self_screener.emergency_symptoms.select_any")}
        </GlobalText>
        <SymptomCheckbox
          label={emergencySymptomToString(CHEST_PAIN)}
          onPress={() => updateSymptoms(CHEST_PAIN)}
          checked={emergencySymptoms.includes(CHEST_PAIN)}
        />
        <SymptomCheckbox
          label={emergencySymptomToString(SEVERE_DIFFICULTY_BREATHING)}
          onPress={() => updateSymptoms(SEVERE_DIFFICULTY_BREATHING)}
          checked={emergencySymptoms.includes(SEVERE_DIFFICULTY_BREATHING)}
        />
        <SymptomCheckbox
          label={emergencySymptomToString(LIGHTHEADEDNESS)}
          onPress={() => updateSymptoms(LIGHTHEADEDNESS)}
          checked={emergencySymptoms.includes(LIGHTHEADEDNESS)}
        />
        <SymptomCheckbox
          label={emergencySymptomToString(DISORIENTATION)}
          onPress={() => updateSymptoms(DISORIENTATION)}
          checked={emergencySymptoms.includes(DISORIENTATION)}
        />
      </ScrollView>
      <View style={style.buttonContainer}>
        <Button
          label={t("common.next")}
          onPress={handleOnPressNext}
          hasRightArrow
          customButtonStyle={style.button}
          customButtonInnerStyle={style.buttonInner}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.secondary10,
    justifyContent: "center",
  },
  mainContentContainer: {
    flexGrow: 1,
    padding: Spacing.large,
  },
  headerText: {
    ...Typography.header1,
    marginBottom: Spacing.medium,
  },
  subheaderText: {
    ...Typography.header4,
    ...Typography.base,
    marginBottom: Spacing.huge,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.huge,
    paddingHorizontal: Spacing.medium,
    backgroundColor: Colors.secondary10,
  },
  button: {
    width: "100%",
  },
  buttonInner: {
    ...Buttons.medium,
    width: "100%",
  },
})

export default EmergencySymptomsQuestions
