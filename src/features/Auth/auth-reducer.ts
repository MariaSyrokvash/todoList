import {setAppStatus} from '../../app/app-reducer';
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {Dispatch} from 'redux';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {ThunkError} from '../../app/store';


const initialState = {
	isLoggedIn: false
}

// type InitialStateType = typeof initialState

export const authTC = createAsyncThunk<undefined, LoginParamsType,
	ThunkError
>('auth/login', async (data: LoginParamsType, thunkAPI) => {
	thunkAPI.dispatch(setAppStatus({status: 'loading'}))
	try {
		const res = await authAPI.login(data)
		if (res.data.resultCode === 0) {
			// thunkAPI.dispatch(setIsLoggedInAC({value: true}))
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			return
		} else {
			handleServerError(res.data, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
		}
	} catch (err) {
		const error: AxiosError = err
		handleNetworkError(error, thunkAPI)
		return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

	}
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
	thunkAPI.dispatch(setAppStatus({status: 'loading'}))
	try {
		const res = await authAPI.logout()
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			return
		} else {
			handleServerError(res.data, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue({})
		}
	} catch (error) {
		handleNetworkError(error.message, thunkAPI)
		return thunkAPI.rejectWithValue({})
	}
})

export const asyncActions = {
	logoutTC,
	authTC
}

export const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		}
	},
	extraReducers: builder => {
		builder.addCase(authTC.fulfilled, (state, action) => {
			state.isLoggedIn = true
		});
		builder.addCase(logoutTC.fulfilled, (state, action) => {
			state.isLoggedIn = false
		})
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
// export const authTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	authAPI.login(data)
// 		.then(res => {
// 			if (res.data.resultCode === 0) {
// 				console.log('You are login')
// 				dispatch(setIsLoggedInAC({value: true}))
// 				dispatch(setAppStatus({status: 'succeeded'}))
// 			} else {
// 				handleServerError(res.data, dispatch)
// 			}
// 		})
// 		.catch(error => {
// 			handleNetworkError(error.message, dispatch)
// 		})
// }

// export const logoutTC = () => (dispatch: Dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	authAPI.logout()
// 		.then(res => {
// 			if (res.data.resultCode === 0) {
// 				dispatch(setIsLoggedInAC({value: false}))
// 				dispatch(setAppStatus({status: 'succeeded'}))
// 			} else {
// 				handleServerError(res.data, dispatch)
// 			}
// 		})
// 		.catch(error => {
// 			handleNetworkError(error.message, dispatch)
// 		})
// }


//types
// export type ActionsType = setErrorType | setStatusType | ReturnType<typeof setIsLoggedInAC>


