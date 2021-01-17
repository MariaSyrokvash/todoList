import React from 'react';
import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists_api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';


// idle - еще запроса не было
// loading - ждем ответа от сервера
// succeeded - ответ пришел, что все ок
// failed - ответ пришел, что ошибка


// в error запишем сообщения от сервера при статусе failed

export type InitialStateType = {
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	isInitialized: boolean
}

const initialState: InitialStateType = {
	status: 'idle',
	error: null,
	isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		case 'APP/SET-IS-INITIALIZED':
			return {...state, isInitialized: action.isInitialized}
		default:
			return state
	}
}

type ActionsType = setErrorType | setStatusType | setAppInitializedType | ReturnType<typeof setIsLoggedInAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setAppInitialized = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED',  isInitialized} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error } as const)
export const setAppStatus = (status: RequestStatusType ) => ({type: 'APP/SET-STATUS',  status } as const)


//thunk
export const initializedTC = () => (dispatch: Dispatch<ActionsType>) => {
	authAPI.me().then(res => {
		if(res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
		} else {

		}
		dispatch(setAppInitialized(true))
	})
}


export type setErrorType = ReturnType<typeof setAppError>
export type setStatusType = ReturnType<typeof setAppStatus>
export type setAppInitializedType = ReturnType<typeof setAppInitialized>