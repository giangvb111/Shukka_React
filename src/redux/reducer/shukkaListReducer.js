import { CLEAR_SHUKKA_LIST, GET_COLUMN_LIST, GET_SHUKKA_LIST } from "../../constants/actionTypes";

const initState = {
     columns: [],
     shukkaList: {
          data: [],
          message: ''
     }
};

const shukkaListReducer = (state = initState, action) => {
     switch (action.type) {
          case GET_SHUKKA_LIST:
               return {
                    ...state,
                    shukkaList: {
                         data: Array.isArray(action.payload) ? action.payload : [],
                         message: Array.isArray(action.payload) ? '' : action.payload
                    }
               };

          case CLEAR_SHUKKA_LIST:
               return {
                    ...state,
                    shukkaList: {}
               };
          case GET_COLUMN_LIST:

               return {
                    ...state,
                    columns: action.payload
               };

          default:
               return state;
     }

}
export default shukkaListReducer;

