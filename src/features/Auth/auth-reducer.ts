import {authAPI, LoginParamsType} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {ThunkError} from '../../utils/types';
import {appActions} from '../CommonActions/CommonActions';

const initialState = {
	isLoggedIn: false
}

export const login = createAsyncThunk<undefined, LoginParamsType,
	ThunkError>('auth/login', async (data: LoginParamsType, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await authAPI.login(data)
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return
		} else {
			return handleServerError(res.data, thunkAPI)
		}
	} catch (err) {
		const error: AxiosError = err
		return handleNetworkError(error, thunkAPI)
	}
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return
		} else {
			return handleServerError(res.data, thunkAPI)
		}
	} catch (error) {
		return handleNetworkError(error.message, thunkAPI)
	}
})

export const asyncActions = {
	logout: logout,
	login: login
}

export const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = true
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = false
			})
	}
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions