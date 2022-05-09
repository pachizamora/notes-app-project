import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import { Colors } from "../constants/styles";

function NoteInput(props) {
  const [enteredNoteText, setEnteredNoteText] = useState("");

  function noteInputHandler(enteredText) {
    setEnteredNoteText(enteredText);
  }

  function addNoteHandler() {
    props.onAddNote(enteredNoteText);
    setEnteredNoteText("");
  }

  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/noteImage.png")}
        />
        <TextInput
          multiline
          numberOfLines={1}
          style={styles.textInput}
          placeholder="Add Note Here"
          onChangeText={noteInputHandler}
          value={enteredNoteText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" color="#000" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="Add Note" color="#000" onPress={addNoteHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.primary2,
    backgroundColor: Colors.primary1,
    color: Colors.primary2,
    borderRadius: 6,
    width: "80%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});

export default NoteInput;
