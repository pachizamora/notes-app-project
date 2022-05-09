import axios from "axios";
import Constants from "expo-constants";

const BACKEND_URL = Constants.manifest.extra.databaseURL;

export async function storeNote(newNotes) {
  const response = await axios.post(BACKEND_URL + "/notes.json", newNotes);
  const id = response.data.name;
  return id;
}

export async function fetchNotes() {
  const response = await axios.get(BACKEND_URL + "/notes.json");

  const notes = [];

  for (const key in response.data) {
    const notesObj = {
      id: key,
      text: response.data[key].text,
    };
    notes.push(notesObj);
  }
  return notes;
}

export function deleteNote(id) {
  return axios.delete(BACKEND_URL + `/notes/${id}.json`);
}
