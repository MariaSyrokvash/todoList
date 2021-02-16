import {authAPI} from '../../api/todolists_api';
import {authActions} from '../Auth/';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from '../CommonActions/CommonActions';

// idle - еще запроса не было
// loading - ждем ответа от сервера
// succeeded - ответ пришел, что все ок
// failed - ответ пришел, что ошибка

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

export const initializedApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
	const res = await authAPI.me()
	if (res.data.resultCode === 0) {
		dispatch(authActions.setIsLoggedIn({value: true}))
	}
	return
})

export const asyncActions = {initializedApp: initializedApp}


export const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(initializedApp.fulfilled, (state, action) => {
				state.isInitialized = true
			})
			.addCase(appActions.setAppStatus, (state, action) => {
				state.status = action.payload.status
			})
			.addCase(appActions.setAppError, (state, action) => {
				state.error = action.payload.error
			})
	}
})

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// export const {setAppError, setAppStatus} = slice.actions
// export type setErrorType = ReturnType<typeof setAppError>
// export type setStatusType = ReturnType<typeof setAppStatus>
