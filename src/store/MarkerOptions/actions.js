import { DESELECT_OPTION, SELECT_OPTION } from "./actionType"
export const select = option=>{
    return {
        type:SELECT_OPTION,
        payload: option
    }
}
export const deselect = option=>{
    return {
        type:DESELECT_OPTION,
        payload: option
    }
}