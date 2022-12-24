import { ACTION_TYPES } from "./actionType";

export const INITIAL_STATE = {
    name: "",
    ISBN: "",
    price: "",
    image: "",
};

export function formReducer(state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.ON_CHANGE:
            return { ...state, [action.payload.name]: action.payload.value };
        case ACTION_TYPES.ON_RESET:
            return {};
        default:
            return state;
    }
}