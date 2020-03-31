import {
    SET_SELECTED_ASSETS,
} from './actions'
import initialState from '../initialState'

//action.asset = [0, 1, ...] || "all" || "none"
const selectedAssets = (state = initialState.selectedAssets, action) => {
    switch (action.type) {
        case SET_SELECTED_ASSETS:
            if (action.selectedAssets instanceof Array) {
                return [...action.selectedAssets]
            } else return [action.selectedAssets]
        default:
            return state
    }
}

export default selectedAssets