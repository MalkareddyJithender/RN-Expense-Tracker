import { StyleSheet,Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred !</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: GlobalStyles.colors.error500,
    marginBottom: 12,
    textAlign:'center'
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
