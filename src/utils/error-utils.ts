import {setAppError, setAppStatus} from '../app/app-reducer';
import {ResponseType} from './../api/todolists_api'
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

type ThunkAPIType = {
	dispatch: (action: any) => any
	rejectWithValue: Function
}

export const handleServerError = <R>(data: ResponseType<R>, dispatch: Dispatch, showError = true) => {
	if (showError) {
		dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Sorry, some error occurred'}))
	}
	dispatch(setAppStatus({status: 'failed'}))
}

export const handleNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError= true) => {
	if (showError) {
		thunkAPI.dispatch(setAppError(error.message ? {error: error.message} : {error: 'Some error occurred!'}))
	}
	thunkAPI.dispatch(setAppStatus({status: 'failed'}))

	return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}