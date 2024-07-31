import { useState, FC, ReactNode } from 'react';
import MyContext from './MyContext';
import { detailsType } from '../types';
import { loadNotesFromLocalStorage, loadTagsFromLocalStorage } from '../localStorage/localStorage';

interface MyContextProviderProps {
  children: ReactNode;
}

const MyContextProvider: FC<MyContextProviderProps> = ({ children }) => {
    const [tags, setTags] = useState<string[]>(loadTagsFromLocalStorage());
    const [notesData , setNotesData] = useState<detailsType[]>(loadNotesFromLocalStorage());
    return (
      <MyContext.Provider value={{ tags, setTags , notesData , setNotesData}}>
        {children}
      </MyContext.Provider>
    );
  };
  
  export default MyContextProvider;