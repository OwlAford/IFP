import NProgress from 'nprogress'
import { message } from 'antd'

const RESET_FORM = 'RESET_FORM'

export const resetForm = () => ({
  type: RESET_FORM
})



const initialState = {
  state: 1
}

export default (state = initialState, action) => {
  switch (action.type) {

    case RESET_FORM:
      return {
        ...state,
        selectedObject: {},
        brhId: ''
      }

    default:
      return state
  }
}
