import { GET_SHUKKA_HEADER_ENTRY, GET_SOUKO_LIST, SHOW_MESSAGE_TOATS, SHUKKA_SUCCESS, UPDATE_SHUKKA_HEADER_ENTRY } from "../../constants/actionTypes";

const initState = []

const shukkaEntryReducer = (state = initState, action) => {
     switch (action.type) {
          case GET_SOUKO_LIST:
               return action.payload

          case GET_SHUKKA_HEADER_ENTRY:
               return action.payload

          case UPDATE_SHUKKA_HEADER_ENTRY:
               return {
                    ...state,
                    comment: action.payload
               }

          case SHOW_MESSAGE_TOATS:
               return {
                    ...state,
                    errMessage: action.payload
               }

          case SHUKKA_SUCCESS:
               return {
                    ...state,
                    shukkaHeader: action.payload
               }

          default:
               return state;
     }

}
export default shukkaEntryReducer;