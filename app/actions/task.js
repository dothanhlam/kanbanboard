import {CREATE_TASK, DELETE_TASK, TOGGLE_TASK} from './constants';

export function createTask(id) {
    return {
        type: FETCH_CARDS,
        id
    }
}


export function deleteTask(id) {
    return {
        id
    }
}

export function toggleTask(id) {
    return {
        type: TOGGLE_CARD_DETAILS,
        id
    }
}