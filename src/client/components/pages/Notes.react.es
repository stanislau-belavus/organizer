'use strict';

import React from 'react';
import {FloatingActionButton, FlatButton, Dialog} from 'material-ui';
import {ContentAdd} from 'material-ui/lib/svg-icons';
import NotesActions from 'actions/notes_actions';
import notesSelectors from 'selectors/notes_selectors';
import Note from 'components/notes/Note.react';

const TITLE_REMOVE_DIALOG = 'Remove note';
const REMOVE_DIALOG_MESSAGE = 'Are you sure you want to delete this note?';

export default class NotesPage extends React.Component {

    constructor(props) {
        super(props);

        this.removeNoteId = null;
    }

    componentWillMount () {
        NotesActions.getNotes();
    }

    _addNote() {
        NotesActions.addNewNote();
    }

    _changeRemoveNoteId(id) {
        this.removeNoteId = id;
        this.forceUpdate();
    }

    _removeNote() {
        NotesActions.removeNote(this.removeNoteId);
        this.removeNoteId = null;
    }

    _renderNotes() {
        let {appState} = this.props;
        let notes = notesSelectors.getNotes(appState);
        let notesComponent = notes.map((note) => {
            return ( <Note note={note} 
                key={note.id} 
                changeRemoveNoteId={this._changeRemoveNoteId.bind(this, note.id)}
                /> 
            );
        });

        return <div className="notes-container">
                    <div>
                        {notesComponent}
                    </div>
                </div>
    }

    render() {
        let renderedNotes = this._renderNotes();
        let actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this._changeRemoveNoteId.bind(this, null)}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this._removeNote.bind(this)}
            />
        ];

        return (
            <div className="notes">
                <Dialog
                      title={TITLE_REMOVE_DIALOG}
                      actions={actions}
                      modal={true}
                      open={!!this.removeNoteId}
                    >
                    {REMOVE_DIALOG_MESSAGE}
                </Dialog>
                {renderedNotes}
                <div className="add-notes">
                    <FloatingActionButton onClick={this._addNote}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>);
    }
}