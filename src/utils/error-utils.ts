import {setAppError, setAppStatus} from '../state/app-reducer';
import {ResponseType} from './../api/todolists_api'
import {Dispatch} from 'redux';
import {ActionsTasksType} from '../state/tasks-reducer';

export const handleServerError = <R>(data: ResponseType<R>, dispatch: Dispatch<ActionsTasksType>) => {
	if (data.messages.length) {
		dispatch(setAppError(data.messages[0]))
	} else {
		dispatch(setAppError('Sorry, some error occurred'))
	}
	dispatch(setAppStatus('failed'))
}

export const handleNetworkError = (error: any, dispatch: Dispatch<ActionsTasksType>) => {
	dispatch(setAppError(error.message ? error.message : 'Some error occurred!'))
	dispatch(setAppStatus('failed'))
}