import React, {useEffect, useState} from 'react'
import { nanoid } from 'nanoid'
const Context = React.createContext(null)

function ContextProvider(props) {
   const [notes, setNotes] = useState([])
   const [currentNote, setCurrentNote] = useState()

   function addNote() {
      setNotes(prevState => {
         const resetSelected = prevState.map(note => ({
            ...note, 
            isSelected: false
         }))

         return [createNewNote(), ...resetSelected]
      })
   }

   function createNewNote() {
      const newNote = {
         id: nanoid(),
         content: '# Type your title',
         isSelected: true
      }
      setCurrentNote(newNote)
      return newNote
   }

   function selectNote(id) {
      setNotes(prevState => prevState.map(note => (
         note.id === id 
            ? {...note, isSelected: true}
            : {...note, isSelected: false}
      )))
   }

   function findSelectedNote() {
      return notes.find(note => note.isSelected)
   }

   function updateNote(text) {
      const oldNotes = notes.filter(note => note.id !== currentNote.id)
      const selectedNote = {...currentNote, content: text}
      setNotes([selectedNote, ...oldNotes])
   }

   useEffect(() => {
      const currentNote = findSelectedNote()
      setCurrentNote(currentNote)
   }, [notes])

   return(
      <Context.Provider value={{
         notes,
         addNote,
         selectNote,
         currentNote,
         updateNote
      }}>
         {props.children}
      </Context.Provider>
   )
}

export {Context, ContextProvider}