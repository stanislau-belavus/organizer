'use strict';

import notesHelper from '../helpers/notesHelpers'; 

let data = [{
    id: 3,
    name: 'note3',
    label: 'note3',
    position: 3
}, {
    id: 1,
    name: ' note1 ',
    label: ' note1 ',
    position: 1
}, {
    id: 2,
    name: '    note2    ',
    label: '     note2    ',
    position: 2
}]
describe('HELPERS TESTING', () => {
    
    it('updateNotes must returned true if note updated success', () => {
        let arr = data.concat();
        let newValues =  { name: 'name', label: 'label'};
        let isUpdate = notesHelper.updateNote(arr, 2, newValues);

        expect(isUpdate).to.be.true;
        expect(arr[2].id).to.be.equal(2);
        expect(arr[2].name).to.be.equal(newValues.name);
        expect(arr[2].label).to.be.equal(newValues.label);

    });

    it('updateNotes must returned false if note updated not found', () => {
        let arr = data.concat();
        let newValues =  { name: 'name', label: 'label'};
        let isUpdate = notesHelper.updateNote(arr, 4, newValues);

        expect(isUpdate).to.be.false;
        expect(arr).to.eql(data);
    });

    it('should sort notes if sortBy correct', () => {
        let arr = data.concat();
        let sortBy = 'position';
        let sortedArray = notesHelper.sortable(arr, sortBy);

        expect(data[0]).to.eql(sortedArray[2]);
        expect(data[1]).to.eql(sortedArray[0]);
        expect(data[2]).to.eql(sortedArray[1]);
    });

    it('should returned unsortable array if sortBy wrong', () => {
        let arr = data.concat();
        let sortBy = 'id';
        let sortedArray = notesHelper.sortable(arr, sortBy);

        expect(data[0]).to.eql(sortedArray[0]);
        expect(data[1]).to.eql(sortedArray[1]);
        expect(data[2]).to.eql(sortedArray[2]);
    });

    it('filter notes should be change format string', () => {
        let arr = data.concat();
        notesHelper.filterNotes(arr);

        expect(data[0].label.trim()).to.eql(arr[0].label);
        expect(data[0].name.trim()).to.eql(arr[0].name);
        expect(data[1].label.trim()).to.eql(arr[1].label);
        expect(data[1].name.trim()).to.eql(arr[1].name);
        expect(data[2].label.trim()).to.eql(arr[2].label);
        expect(data[2].name.trim()).to.eql(arr[2].name);
    });
});;