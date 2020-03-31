export const SET_SELECTED_ASSETS = 'SET_SELECTED_ASSETS'
export const UPDATE_ASSETS = 'UPDATE_ASSETS'
export const SET_ASSETS = 'SET_ASSETS'

export function setSelectedAssets (assets) {
    return {type: SET_SELECTED_ASSETS, assets}
}


export function updateAssets (asset) {
    return {type: UPDATE_ASSETS, asset}
}

export function setAssets (assets) {
    return {type: SET_ASSETS, assets}
}
