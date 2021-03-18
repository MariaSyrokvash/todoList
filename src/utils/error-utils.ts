import {AxiosError} from 'axios';
import {GenericResponseType} from '../api/types';
import {appActions} from '../features/CommonActions/CommonActions';

type ThunkAPIType = {
	dispatch: (action: any) => any
	rejectWithValue: Function
}

export const handleServerError = <R>(data: GenericResponseType<R>, thunkAPI: ThunkAPIType, showError = true) => {
	if (showError) {
		thunkAPI.dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Sorry, some error occurred'}))
	}
	thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))

	return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
	if (showError) {
		thunkAPI.dispatch(appActions.setAppError(error.message ? {error: error.message} : {error: 'Some error occurred!'}))
	}
	thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))

	return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}