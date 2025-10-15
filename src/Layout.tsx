import { Outlet, Navigate, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import { SearchModal } from "./components/SearchModal";
import { useCurrentUserStore } from "./modules/auth/current-user.state";

import { useNoteStore } from "./modules/notes/note.state";
import { useState, useEffect } from "react";
import { noteRepository } from "./modules/notes/note.repository";
import { Note } from "./modules/notes/note.entity";
import { subscribe, unsubscribe } from "./lib/supabase";

const Layout = () => {
  const { currentUser } = useCurrentUserStore();

  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
    const channel = subscribeNotes();
    return () => {
      unsubscribe(channel!);
    };
  }, []);

  const subscribeNotes = () => {
    if (currentUser == null) return;

    return subscribe(currentUser!.id, (payload) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        noteStore.set([payload.new]);
      } else if (payload.eventType === "DELETE") {
        noteStore.deleteNote(payload.old.id!);
      }
    });
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id, 0);
    if (notes != null) {
      noteStore.set(notes);
    }
    setIsLoading(false);
  };

  const searchNotes = async (keyword: string) => {
    const notes = await noteRepository.findByKeyword(currentUser!.id, keyword);
    if (notes != null) {
      setSearchResult(notes);
      noteStore.set(notes);
    }
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
    setIsShowModal(false);
  };

  if (currentUser === undefined) {
    return <Navigate replace to="/signin" />;
  }
  return (
    <div className="h-full flex">
      {!isLoading && (
        <SideBar
          onSearchButtonClicked={() => {
            setIsShowModal(true);
          }}
        />
      )}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResult}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
