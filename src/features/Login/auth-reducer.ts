import {setAppStatus, setErrorType, setStatusType} from '../../state/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {Dispatch} from 'redux';
import {ActionsTasksType} from '../../state/tasks-reducer';


const initialState = {
	isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.value}
		default:
			return state
	}
}

//actions
export const setIsLoggedInAC = (value: boolean) =>
	({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const authTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | ActionsTasksType>) => {
	dispatch(setAppStatus('loading'))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				console.log('You are login')
				dispatch(setIsLoggedInAC(true))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleServerError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleNetworkError(error.message, dispatch)
		})
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | ActionsTasksType>) => {
	dispatch(setAppStatus('loading'))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleServerError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleNetworkError(error.message, dispatch)
		})
}


//types
export type ActionsType = setErrorType | setStatusType | ReturnType<typeof setIsLoggedInAC>


