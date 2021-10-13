export const FETCH_CARDS_PENDING = 'FETCH_CARDS_PENDING';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';

function fetchCadsPending() {
    return {
        type: FETCH_CARDS_PENDING
    }
}

function fetchCardsSuccess(cards) {
    return {
        type: FETCH_CARDS_SUCCESS,
        cards: cards
    }
}

function fetchCardsError(error) {
    return {
        type: FETCH_CARDS_ERROR,
        error: error
    }
}