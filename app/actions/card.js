import {FETCH_CARDS, TOGGLE_CARD_DETAILS} from './constants';

export function fetchCard(id) {
    return {
        type: FETCH_CARDS,
        id
    }
}


export function toggleCardDetails(id) {
    return {
        type: TOGGLE_CARD_DETAILS,
        id
    }
}