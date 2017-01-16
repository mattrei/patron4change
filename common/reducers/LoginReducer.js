import { combineReducers } from 'redux'
import { LoginState} from '../constants/Types'
import types from '../constants/ActionTypes'
import createReducer  from '../utils/createReducer'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function LOGIN_SUCCESS(state, action){
	return Object.assign({}, state, {
		isAuthenticated: true,
		profile: action.profile,
		error: ''
	})
}

function LOGIN_ERROR(state, action){
	return Object.assign({}, {
		isAuthenticated: false,
		profile: null,
		error: action.err
	})
}

function LOGOUT_SUCCESS(state, action){
	return Object.assign({}, {
		isAuthenticated: false,
		profile: null,
		error: ''
	})
}

const handlers = {
	[types.LOGIN_SUCESS]: LOGIN_SUCCESS,
	[types.LOGIN_ERROR]: LOGIN_ERROR,
	[types.LOGOUT_SUCCESS]: LOGOUT_SUCCESS,
}

export default createReducer(new LoginState(), handlers)

