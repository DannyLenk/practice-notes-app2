import React from 'react'

export default function Sidebar(props) {

    const allNotes = props.notes.map(note => (

        <section key={note.id}
                 className={
                    `title ${note.id === props.currentNoteId ? 'selected-note' : ''}`
                }
        >

            <h4 className="text-snippet">
                {note.content}
            </h4>
        </section>
    ))


    return(

        <aside className="sidebar">

            <header className="sidebar--header">

                <h3>Notes</h3>

                <button className="new-note"
                        onClick={props.addNote}
                >
                    +
                </button>
            </header>

            {allNotes}

        </aside>

    )
}