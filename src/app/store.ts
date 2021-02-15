import {ActionCreatorsMapObject, applyMiddleware, bindActionCreators, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/TodoLists/todolists-reducer';
import {tasksReducer} from '../features/TodoLists/tasks-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Auth/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {FieldErrorType} from '../api/todolists_api';


const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})

export type rootReducerType = typeof rootReducer

export type AppRootState = ReturnType<typeof rootReducer>

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger)
})

// @ts-ignore
window.store = store;


export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
	const dispatch = useAppDispatch()

	const boundActions = useMemo(() => {
		return bindActionCreators(actions, dispatch)
	}, [])

	return boundActions
}


export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}