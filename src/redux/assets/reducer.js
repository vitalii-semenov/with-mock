import {
    SET_SELECTED_ASSETS,
    SET_POPUP_VISIBILITY,
    SET_ASSETS
} from './actions'
import initialState from '../initialState'

//action.asset = [0, 1, ...] || "all" || "none"
const selectedAssets = (state = initialState.selectedAssets, action) => {
    switch (action.type) {
        case SET_SELECTED_ASSETS:
            if (action.selectedAssets instanceof Array) {
                return [...action.selectedAssets]
            } else return [action.selectedAssets]
        case SET_ASSETS:
            return  {...state, assets: action.assets};
        case SET_POPUP_VISIBILITY:
            return {...state, popupVisibility: action.isVisible}
        default:
            return state
    }
}

export default selectedAssets
