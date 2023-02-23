import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, style, mode }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flatButton]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flatButton:{
    backgroundColor:'transparent'
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight:"500"
  },
  flatText:{
    color: GlobalStyles.colors.primary100
  },
  pressed:{
    opacity:0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius:4,
  }
});
