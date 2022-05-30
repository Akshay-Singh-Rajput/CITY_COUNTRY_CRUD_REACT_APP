export const ADD_DATA = "ADD_DATA";
export const GET_DATA = "GET_DATA";
export const SEARCH = 'SEARCH';
export const SORT = 'SORT';

export const addCountry = (data) => ({
    type: ADD_DATA,
    payload: data
});

export const getData = (data) => ({
    type: GET_DATA,
    payload: data
});


export const sort = (data) => ({
    type: SORT,
    payload: data
});