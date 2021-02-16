import {combineReducers} from 'redux';
import {tasksReducer, todolistsReducer} from '../features/TodoLists';
import thunk from 'redux-thunk';
import {appReducer} from '../features/Application';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {authReducer} from '../features/Auth';


export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})

// export type rootReducerType = typeof rootReducer
// export type AppRootState = ReturnType<typeof rootReducer>
// export type AppDispatchType = typeof store.dispatch
// export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}
// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger)
})

// @ts-ignore
window.store = store;

