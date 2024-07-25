export const shukkaListSelector = (state) => state.shukkaList.shukkaList.data
export const messageSelector = (state) => state.shukkaList.shukkaList.message
export const columnSelector = (state) => state.shukkaList.columns
export const shukkaHeaderEntry = (state) => state.shukkaEntry
export const shukkaComment = (state) => state.shukkaEntry.comment
export const showErrMessage = (state) => state.shukkaEntry.errMessage
export const shukkaSuccess = (state) => state.shukkaEntry.shukkaHeader