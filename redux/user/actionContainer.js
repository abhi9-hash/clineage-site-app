import { LOGIN } from './actionTypes';

export const loginUser = (user) => (dispatch) => {
    try {
        console.log(user);

        dispatch({type: LOGIN, payload: user});
    } catch (error) {
        console.log(error);
    }
}