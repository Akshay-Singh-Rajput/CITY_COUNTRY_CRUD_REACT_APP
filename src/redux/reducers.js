import { ADD_DATA, GET_DATA, SORT } from "./action";


const initialState = {
    storeData: [],

};
export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_DATA: {
            return {
                ...state,
                storeData: payload
            };
        };
        case ADD_DATA: {
            return {
                ...state,
                storeData: payload
            };
        };

        case SORT: {
            console.log("state", payload);
            if (payload === "asc") {
                return {
                    ...state,
                    storeData: [ ...state.storeData ].sort((a, b) => a.population < b.population ? 1 : a.population  > b.population ? -1 : 0)
                };
            }
            else {
                return {
                    ...state,
                    storeData: [ ...state.storeData ].sort((a, b) => a.population > b.population ? 1 : a.population  < b.population  ? -1 : 0)
                };
            }

        }

        // case REMOVE_DATA: {
        //     return {
        //         ...state,
        //         storeData: [ ...state ].filter((item) => item.id !== payload)
        //     };
        // }
        default:
            return state;

    }
};