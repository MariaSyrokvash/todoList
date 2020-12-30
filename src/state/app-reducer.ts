import React from 'react';


// idle - еще запроса не было
// loading - ждем ответа от сервера
// succeeded - ответ пришел, что все ок
// failed - ответ пришел, что ошибка


// в error запишем сообщения от сервера при статусе failed

export type InitialStateType = {
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: InitialStateType = {
	status: 'idle',
	error: null
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		default:
			return state
	}
}

type ActionsType = setErrorType | setStatusType


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setError = (error: string | null) => ({type: 'APP/SET-ERROR', error } as const)
export const setStatus = (status: RequestStatusType ) => ({type: 'APP/SET-STATUS', status } as const)


export type setErrorType = ReturnType<typeof setError>
export type setStatusType = ReturnType<typeof setStatus>