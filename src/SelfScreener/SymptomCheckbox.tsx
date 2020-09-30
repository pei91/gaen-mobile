import React, { FunctionComponent } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { SvgXml } from "react-native-svg"

import { GlobalText } from "../components"

import { Typography, Colors, Iconography, Outlines, Spacing } from "../styles"
import { Icons } from "../assets"

interface SymptomCheckboxProps {
  label: string
  onPress: () => void
  checked: boolean
}

const SymptomCheckbox: FunctionComponent<SymptomCheckboxProps> = ({
  label,
  onPress,
  checked,
}) => {
  const checkboxIcon = checked ? Icons.CheckboxChecked : Icons.CheckboxUnchecked
  const checkboxColor = checked ? Colors.primary100 : Colors.neutral75

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      accessible
      accessibilityLabel={label}
    >
      <View style={style.checkboxContainer}>
        <SvgXml
          xml={checkboxIcon}
          fill={checkboxColor}
          width={Iconography.small}
          height={Iconography.small}
        />
        <GlobalText style={style.checkboxText}>{label}</GlobalText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const style = StyleSheet.create({
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.medium,
    paddingLeft: Spacing.medium,
    marginBottom: Spacing.medium,
    borderRadius: Outlines.baseBorderRadius,
    borderColor: Colors.secondary100,
    borderWidth: Outlines.hairline,
    backgroundColor: Colors.white,
  },
  checkboxText: {
    ...Typography.body1,
    ...Typography.largeFont,
    color: Colors.primaryText,
    width: "80%",
    marginLeft: Spacing.medium,
  },
})

export default SymptomCheckbox
