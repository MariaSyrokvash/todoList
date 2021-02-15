import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists_api';
import {setIsLoggedInAC} from '../features/Auth/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {action} from '@storybook/addon-actions';

// idle - еще запроса не было
// loading - ждем ответа от сервера
// succeeded - ответ пришел, что все ок
// failed - ответ пришел, что ошибка

// в error запишем сообщения от сервера при статусе failed

// export type InitialStateType = {
// 	status: 'idle' | 'loading' | 'succeeded' | 'failed'
// 	error: string | null
// 	isInitialized: boolean
// }

const initialState: initialAppStateType = {
	status: 'idle',
	error: null,
	isInitialized: false
}

export type initialAppStateType = {
	status: RequestStatusType,
	error: null | string,
	isInitialized: boolean
}

export const initializedTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
	const res = await authAPI.me()
	if (res.data.resultCode === 0) {
		dispatch(setIsLoggedInAC({value: true}))
	}
	return
})

export const asyncActions = {initializedTC}


const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		// setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
		// 	state.isInitialized = action.payload.isInitialized
		// },
		setAppError(state, action: PayloadAction<{ error: string | null }>) {
			// @ts-ignore
			state.error = action.payload.error
		},
		setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status
		}
	},
	extraReducers: builder => {
		builder.addCase(initializedTC.fulfilled, (state, action) => {
			state.isInitialized = true
		})
	}
})

export const appReducer = slice.reducer


// export const appReducer =
// 	(state: InitialStateType = initialState, action: any): InitialStateType => {
// 	switch (action.type) {
// 		case 'APP/SET-STATUS':
// 			return {...state, status: action.status}
// 		case 'APP/SET-ERROR':
// 			return {...state, error: action.error}
// 		case 'APP/SET-IS-INITIALIZED':
// 			return {...state, isInitialized: action.isInitialized}
// 		default:
// 			return state
// 	}
// }

// type ActionsType = setErrorType | setStatusType | setAppInitializedType | ReturnType<typeof setIsLoggedInAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// export const setAppInitialized = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
// export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const {setAppError, setAppStatus} = slice.actions


//thunk
// export const initializedTC = () => (dispatch: Dispatch) => {
// 	authAPI.me().then(res => {
// 		if (res.data.resultCode === 0) {
// 			dispatch(setIsLoggedInAC({value: true}))
// 		} else {
// 		}
// 		dispatch(setAppInitialized({isInitialized: true}))
// 	})
// }


export type setErrorType = ReturnType<typeof setAppError>
export type setStatusType = ReturnType<typeof setAppStatus>
// export type setAppInitializedType = ReturnType<typeof setAppInitialized>