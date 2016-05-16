import Immutable from "immutable";
import { createReducer } from "redux-immutablejs";
import * as Action from "../actions/card";

const initialState = Immutable.fromJS({
    loading: false,
    valid: false,
    errors: null
});


export default createReducer(initialState, {
    [Action.TOGGLE_CARD_DETAILS]: state => state,

    [Action.FETCH_CARDS]: (state) => {
        return state;
    }
});