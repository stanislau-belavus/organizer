'use strict';

import React from 'react';
import {FloatingActionButton, Paper, TextField} from 'material-ui';
import {ContentAdd} from 'material-ui/lib/svg-icons';
import NotesActions from 'actions/notes_actions';
import notesSelectors from 'selectors/notes_selectors';
import configStyleNotes from 'constants/notes_colors_config';

const noteStyle = {
  height: 250,
  width: 200,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const noteTitleStyle = {
    width: '100%'
}

export default class NotesPage extends React.Component {

    constructor(props) {
        super(props);
    }

    _addNote() {
        NotesActions.addNewNote();
    }

    _renderNotes() {
        let {appState} = this.props;
        let notes = notesSelectors.getNotes(appState);
        let notesComponent = notes.map((note, index) => {
            let noteRandomStyle = configStyleNotes[Math.floor(Math.random()*configStyleNotes.length)];
            let fullStyleNote = Object.assign({}, noteStyle, noteRandomStyle);
            let {title, body} = note;
            return <Paper className="note" style={fullStyleNote} key={index} zDepth={2} rounded={false} >
                <TextField className="note-title" style={noteTitleStyle} defaultValue={title} underlineShow={false} />
                <div className="note-body">
                    <textarea className="note-text" defaultValue={body} multiLine={true}/>
                </div>
            </Paper>
        });

        return <div className="notes-container">
                    <div>
                        {notesComponent}
                    </div>
                </div>
    }

    render() {
        let renderedNotes = this._renderNotes();
        console.log(this.props.appState.toJS());
        return (<div className="notes">
                {renderedNotes}
                <div className="add-notes">
                    <FloatingActionButton onClick={this._addNote}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>);
    }
}