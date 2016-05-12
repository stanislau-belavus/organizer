'use strict';

import additionalHelper from './additionalHelper';

export default {
    sortable: (arr, sortBy) => {
        let correctSortBy = additionalHelper.checkSortByParam(sortBy);

        if(correctSortBy) {
            return arr.sort(function (left, right) {
                return left[sortBy] - right[sortBy];
            });
        }
        else {
            return arr;
        }
    },
    updateNote: (arr, noteId, mapNewValues) => {
        let oldNote = additionalHelper.getNode(arr, noteId);

        if(oldNote) {
            Object.keys(mapNewValues).forEach((key) => {
                oldNote[key] = mapNewValues[key];
            });

            return true;
        }
        else {
            return false;
        }
    },
    filterNotes: (arr) => {
        additionalHelper.filterByName(arr);
        additionalHelper.filterByLabel(arr);
    }
};
