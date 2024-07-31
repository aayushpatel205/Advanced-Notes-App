import { createContext, Dispatch, SetStateAction } from "react";
import { detailsType } from "../types";

interface NotesProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  notesData: detailsType[];
  setNotesData: Dispatch<SetStateAction<detailsType[]>>;
}
export const MyContext = createContext<NotesProps | undefined>(undefined);

export default MyContext;
