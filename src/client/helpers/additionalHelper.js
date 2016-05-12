'use strict';

const SORT_BY_CONFIG = {
    name: true,
    label: true,
    position: true
};

const filterString = (arr, filterBy) => {
    if(Array.isArray(arr)) {
        arr.forEach((item) => {
            if(!item[filterBy]) {
                item[filterBy] = '';
            }

            item[filterBy] = item[filterBy].trim();
        });
    }

    return arr;
};

export default {
    getNode: (arr, noteId) => {
        let result = null;

        if(Array.isArray(arr)) {
            arr.forEach((note) => {
                if(note.id === noteId) {
                    result = note;
                }
            });
        }

        return result;
    },

    checkSortByParam: (sortBy) => {
        return SORT_BY_CONFIG[sortBy] ? true : false; 
    },

    filterByName: (arr) => { filterString(arr, 'name') },

    filterByLabel: (arr) => { filterString(arr, 'label') }
}