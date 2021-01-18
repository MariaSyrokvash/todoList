import {setAppError, setAppStatus, setErrorType, setStatusType} from '../state/app-reducer';
import {ResponseType} from './../api/todolists_api'
import {Dispatch} from 'redux';

export const handleServerError = <R>(data: ResponseType<R>, dispatch:  Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppError({error: data.messages[0]}))
	} else {
		dispatch(setAppError({error: 'Sorry, some error occurred'}))
	}
	dispatch(setAppStatus({status: 'failed'}))
}

export const handleNetworkError = (error: { message: string }, dispatch:  Dispatch ) => {
	dispatch(setAppError(error.message ? {error: error.message} : {error: 'Some error occurred!'}))
	dispatch(setAppStatus({status: 'failed'}))
}