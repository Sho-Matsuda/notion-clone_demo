import { Note } from "@/modules/notes/note";
import TextAreaAutoSize from "react-textarea-autosize";
import { useState } from "react";

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  const [title, setTitle] = useState(initialData.title ?? "無題");

  return (
    <div className="pl-[54px] group relative">
      <TextAreaAutoSize
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F 
        resize-none"
        value={title}
        onChange={(e) => {
					setTitle(e.target.value);
					onTitleChange(e.target.value);
				}}
      />
    </div>
  );
}
