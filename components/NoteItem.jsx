import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../constants/styles";

function NoteItem(props) {
  return (
    <View style={styles.noteItem}>
      <Pressable
        android_ripple={{ color: Colors.primary1 }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.noteItemText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  noteItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary2,
  },
  pressedItem: {
    opacity: 0.5,
  },
  noteItemText: {
    color: "white",
    padding: 8,
  },
});
