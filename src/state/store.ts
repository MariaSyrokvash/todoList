import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';


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