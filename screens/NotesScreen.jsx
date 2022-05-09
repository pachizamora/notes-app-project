import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import NoteItem from "../components/NoteItem";
import NoteInput from "../components/NoteInput";
import { storeNote, fetchNotes, deleteNote } from "../util/http";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [newNotes, setNewNotes] = useState([]);

  function startAddNoteHandler() {
    setModalIsVisible(true);
  }

  function endAddNoteHandler() {
    setModalIsVisible(false);
  }

  useEffect(() => {
    async function getNotes() {
      const notes = await fetchNotes();
      setNewNotes(notes);
    }

    getNotes();
  }, []);

  async function addNoteHandler(enteredNoteText) {
    const id = await storeNote({ text: enteredNoteText });
    setNewNotes((currentNotes) => [
      ...currentNotes,
      { text: enteredNoteText, id: id },
    ]);
    endAddNoteHandler();
  }

  async function delteNoteHandler(id) {
    setNewNotes((currentNotes) => {
      return currentNotes.filter((note) => note.id !== id);
    });
    await deleteNote(id);
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Note"
          color="#000"
          onPress={startAddNoteHandler}
        />
        <NoteInput
          showModal={modalIsVisible}
          onAddNote={addNoteHandler}
          onCancel={endAddNoteHandler}
        />
        <View style={styles.notesContainer}>
          <FlatList
            data={newNotes}
            renderItem={(itemData) => {
              return (
                <NoteItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={delteNoteHandler}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 50,
    paddingHorizontal: 16,
  },
  notesContainer: {
    flex: 5,
  },
});
