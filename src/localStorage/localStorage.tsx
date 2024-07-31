import { detailsType } from "../types";

export const loadNotesFromLocalStorage = () => {
  const savedNotes = localStorage.getItem("notesData");
  return savedNotes ? JSON.parse(savedNotes) : [];
};

export const saveNotesToLocalStorage = (notes: detailsType[]) => {
  localStorage.setItem("notesData", JSON.stringify(notes));
};

export const loadTagsFromLocalStorage = ()=>{
    const savedTags = localStorage.getItem("tags");
    return savedTags ? JSON.parse(savedTags) : [];
}

export const saveTagsToLocalStorage = (tags: string[]) => {
    localStorage.setItem("tags", JSON.stringify(tags));
};