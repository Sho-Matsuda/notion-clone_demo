import { TitleInput } from "@/components/TitleInput";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { noteRepository } from "@/modules/notes/note.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { useNoteStore } from "@/modules/notes/note.state";
import Editor from "@/components/Editor";

const NoteDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const noteId = parseInt(params.id!);
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const note = noteStore.getOne(noteId);

  useEffect(() => {
    fetchOne();
  }, [noteId]);

  const fetchOne = async () => {
    setIsLoading(true);
    const _note = await noteRepository.findOne(currentUser!.id, noteId);
    if (_note == null) return;
    noteStore.set([_note]);
    setIsLoading(false);
  };

  const updateNote = async (
    noteId: number,
    note: { title?: string; content?: string }
  ) => {
    const _note = await noteRepository.update(noteId, note);
    if (_note == null) return;
    noteStore.set([_note]);
    return _note;
  };

  if (isLoading) return <div />;
  if (note == null) return <div>note is not existed</div>;

  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput
          initialData={note}
          onTitleChange={(title) => updateNote(noteId, { title })}
        />
        <Editor initialContent={note.content} onChange={(content) => updateNote(noteId, { content })} />
      </div>
    </div>
  );
};

export default NoteDetail;
