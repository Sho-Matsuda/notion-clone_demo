import { atom, useAtom } from "jotai";
import { Note } from "./note.entity";

const noteState = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteState);

  const set = (notes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...notes];

      const uniqueNotes: { [key: number]: Note } = {};
      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }

      return Object.values(uniqueNotes);
    });
  };
  const getOne = (id: number) => {
    return notes.find((note) => note.id == id);
  };
  const deleteNote = async (id: number) => {
    const findChildrenIds = (parentId: number): number[] => {
      const childrenIds = notes
        .filter((note) => note.parent_document == parentId)
        .map((note) => note.id);
      return childrenIds.concat(
        ...childrenIds.map((childId) => findChildrenIds(childId))
      );
    };
    const childrenIds = findChildrenIds(id);
    setNotes((oldNotes) =>
      oldNotes.filter((note) => ![...childrenIds, id].includes(note.id))
    );
  };
  const clear = () => {
    setNotes([]);
  };
  return {
    getAll: () => notes,
    deleteNote,
    getOne,
    set,
    clear,
  };
};
