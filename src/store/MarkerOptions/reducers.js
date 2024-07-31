import { SELECT_OPTION,DESELECT_OPTION } from "./actionType";

const initialState={

    options:[{label:"wildfire",value:"WildFire"}]
}



const OptionReducer=(state = initialState, { type, payload }) => {
  switch (type) {

  case SELECT_OPTION:
    return {
        ...state,
        options:[ ...state.options, payload ]}
  case DESELECT_OPTION:
    return {
        ...state,
        options:state.options.filter(option=> option.value !== payload.value)}

  default:
    return state
  }
}
export default OptionReducer