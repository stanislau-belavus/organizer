'use strict';

import notesCtrl from 'server/controllers/notes';
import NotesModel from 'server/models/notes';

describe('Testing work with notes', () => {
    it('should work createNewNote', (done) => {
        let position = 1;
        let response = {
            json: () => {}
        }

        let jsonStub = global.sandbox.stub(response, 'json', (data) => {
            expect(data.status).to.be.equal('ok');
        });

        let getLastPositionStub = global.sandbox.stub(NotesModel, 'getLastPosition', (data) => {
            return new Promise((resolve) => {
                resolve(position);
            });
        });

        let createNewNoteStub = global.sandbox.stub(NotesModel, 'createNewNote', (data) => {
            expect(data.position).to.be.equal(position);
            return new Promise((resolve) => {
                resolve();
            });
        });
        notesCtrl.createNewNote({}, response).then(() => {
            expect(getLastPositionStub).to.have.been.calledOnce;
            expect(createNewNoteStub.callCount).to.be.equal(1);
            expect(jsonStub).to.be.calledOnce;
            done();
        });
    });

    it('should work get all notes', (done) => {
        let notes = {
            notes: ['note1', 'note2']
        };
        let response = { json: () => {} };

        let jsonGetStub = global.sandbox.stub(response, 'json', (data) => {
            expect(data.notes).to.eql(notes);
            expect(data.status).to.be.equal('ok');
        });

        let getAllStub = global.sandbox.stub(NotesModel, 'getAll', () => {
            return new Promise((resolve) => {
                resolve(notes);
            });
        });

        notesCtrl.getNotes({}, response).then((data) => {
            expect(getAllStub).to.be.calledOnce;
            expect(jsonGetStub).to.be.calledOnce;
            done();
        });
    });

    it('should work remove note', (done) => {
        let request = {
            body: { id: 'id'}
        };
        let response = { json: () => {} };
        let jsonStub = global.sandbox.stub(response, 'json', (data) => {
            expect(data.status).to.be.equal('ok');
        });
        let removeNoteStub = global.sandbox.stub(NotesModel, 'removeNote', (data) => {
            return new Promise((resolve) => {
                expect(data._id).to.equal(request.body.id);
                resolve();
            });
        });

        notesCtrl.removeNote(request, response).then(() => {
            expect(removeNoteStub).to.be.calledOnce;
            expect(jsonStub).to.be.calledOnce;
            done();
        });
    });

    it('should work updateOrder', (done) => {
        let request = {
            body: { 
                dropNote: 'dropNote',
                dragNote: 'dragNote'
            }
        };
        let response = { json: () => {} };
        let jsonStub = global.sandbox.stub(response, 'json', (data) => {
            expect(data.status).to.be.equal('ok');
        });
        let updateOrderStub = global.sandbox.stub(NotesModel, 'updateOrder', (dropNote, dragNote) => {
            expect(request.body.dragNote).to.eql(dragNote);
            expect(request.body.dropNote).to.eql(dropNote);
            return new Promise((resolve) => {
                resolve();
            });
        });

        notesCtrl.updateOrder(request, response).then((data) => {
            expect(updateOrderStub).to.be.calledOnce;
            expect(jsonStub).to.be.calledOnce;
            done();
        });
    });

    it('should work undo note', (done) => {
        let response = { json: () => {} };
 
        let jsonStub = global.sandbox.stub(response, 'json', (data) => {
            expect(data.status).to.be.equal('ok');
        });

        let undoNotesStub = global.sandbox.stub(NotesModel, 'undoNotes', () => {
            return new Promise((resolve) => {
                resolve();
            });
        });

        notesCtrl.undoNotes({}, response).then(() => {
            expect(undoNotesStub).to.be.calledOnce;
            expect(jsonStub).to.be.calledOnce;
            done();
        });
    });
});