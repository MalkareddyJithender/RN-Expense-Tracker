import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ error, label, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (error) {
    inputStyles.push(styles.errorInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
        <Text style={styles.asterisk}>*</Text>
      </View>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  labelContainer: {
    flexDirection: "row",
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 13,
    marginBottom: 4,
    marginRight: 2,
  },
  asterisk: {
    color: GlobalStyles.colors.error500,
    fontSize: 12,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
