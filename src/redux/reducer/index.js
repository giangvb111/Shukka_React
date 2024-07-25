import { combineReducers } from "redux";
import shukkaEntryReducer from './shukkaEntryReducer'
import shukkaListReducer from './shukkaListReducer'

const rootReducer = combineReducers({
     shukkaEntry: shukkaEntryReducer,
     shukkaList: shukkaListReducer
});
export default rootReducer;