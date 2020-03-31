import {combineReducers} from 'redux'
//import AssetsReducer from './assets/reducer'
import SelectedAssetsReducer from './assets/reducer'

export default combineReducers({
    selectedAssets: SelectedAssetsReducer,
})