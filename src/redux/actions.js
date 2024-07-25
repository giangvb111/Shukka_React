import { CLEAR_SHUKKA_LIST, GET_COLUMN_LIST, GET_SHUKKA_HEADER_ENTRY, GET_SHUKKA_LIST, GET_SOUKO_LIST, SHOW_MESSAGE_TOATS, SHUKKA_SUCCESS, UPDATE_SHUKKA_HEADER_ENTRY } from "../constants/actionTypes"

export const searchShukka = (data) => {
    return {
        type: GET_SHUKKA_LIST,
        payload: data
    }
}

export const getColumns = (data) => {
    return {
        type: GET_COLUMN_LIST,
        payload: data
    }
}

export const getSoukoList = (data) => {
    return {
        type: GET_SOUKO_LIST,
        payload: data
    }
}

export const shukkaHeaderEntry = (data) => {
    return {
        type: GET_SHUKKA_HEADER_ENTRY,
        payload: data
    }
}

export const updateShukkaHeaderEntry = (data) => {
    return {
        type: UPDATE_SHUKKA_HEADER_ENTRY,
        payload: data
    }
}

export const showMessageToats = (message) => {
    return {
        type: SHOW_MESSAGE_TOATS,
        payload: message
    }
}

export const getShukkaSuccess = (data) => {
    return {
        type: SHUKKA_SUCCESS,
        payload: data
    }
}

export const clearShukkaList = () => {
    return {
        type: CLEAR_SHUKKA_LIST
    }
}