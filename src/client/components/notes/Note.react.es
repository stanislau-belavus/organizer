'use strict';

import React from 'react';
import {Paper, TextField, IconButton, Dialog} from 'material-ui';
import {ContentClear} from 'material-ui/lib/svg-icons';
import { DragSource, DropTarget } from 'react-dnd';
import DndTypes from 'constants/dnd_types';
import NotesActions from 'actions/notes_actions';

const dragStyle = {
  height: '10px',
  width: '100%'
};

const noteStyle = {
  margin: 10,
  textAlign: 'center',
  display: 'inline-block'
};

const noteTitleStyle = {
    width: '100%'
};

const itemSource = {
    beginDrag(props) {
        return {
            note: {
                id: props.note.id,
                position: props.note.position
            }
        };
    }
};
const itemTarget = {
    drop(props, monitor) {
        if(monitor.isOver({ shallow: true })) {
            let dragNote =  monitor.getItem().note;
            let dropNote = props.note;
            NotesActions.updateOrder({ dragNote, dropNote });
        }
    }
};

@DragSource(DndTypes.NOTES_ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(DndTypes.NOTES_ITEM, itemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOverNote: monitor.isOver(),
    canDropNote: monitor.canDrop()
}))
export default class Note extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isDragging, connectDragSource, connectDropTarget, note, changeRemoveNoteId, isOverNote, canDropNote } = this.props;
        const classNameIsCanDrop = isOverNote && canDropNote ? 'drop-target' : '';
        let fullStyleNote = Object.assign({}, noteStyle, note.style, 
            isDragging ? {opacity: 0.5} : {});
        let {title, body, id} = note;
        return connectDropTarget(connectDragSource(
            <div className={'notes-shell '+ classNameIsCanDrop}>
                <Paper className='note' style={fullStyleNote} zDepth={2} rounded={false} >
                    <Paper style={dragStyle}></Paper>
                    <TextField className="note-title" style={noteTitleStyle} defaultValue={title} underlineShow={false} />
                    <div className="note-body">
                        <textarea className="note-text" defaultValue={body} multiLine={true}/>
                    </div>
                    <IconButton onClick={changeRemoveNoteId}>
                        <ContentClear />
                    </IconButton>
                </Paper>
            </div>  
        ));
    }
}