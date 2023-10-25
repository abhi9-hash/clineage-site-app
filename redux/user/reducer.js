import { LOGIN } from "./actionTypes"

const initialState = {
    userDetails: {
        name: "",
        age: "",
        gender: false,
        countries: []
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN: return {
            ...state,
            userDetails: action.payload
        }

        default: return state
    }
}

export default reducer;