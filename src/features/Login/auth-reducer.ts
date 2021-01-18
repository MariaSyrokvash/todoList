import {setAppStatus} from '../../state/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
	isLoggedIn: false
}

// type InitialStateType = typeof initialState


const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		}
	}
})

export const authReducer = slice.reducer

// 	(state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
// 	switch (action.type) {
// 		case 'login/SET-IS-LOGGED-IN':
// 			return {...state, isLoggedIn: action.value} //immerjs
// 		default:
// 			return state
// 	}
// }

//actions
// export const setIsLoggedInAC = (value: boolean) =>
// 	({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const {setIsLoggedInAC} = slice.actions

//thunks
export const authTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				console.log('You are login')
				dispatch(setIsLoggedInAC({value: true}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleServerError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleNetworkError(error.message, dispatch)
		})
}

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({value: false}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleServerError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleNetworkError(error.message, dispatch)
		})
}


//types
// export type ActionsType = setErrorType | setStatusType | ReturnType<typeof setIsLoggedInAC>


