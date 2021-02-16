import {Provider} from 'react-redux';
import React from 'react';
import { combineReducers} from 'redux';
import {tasksReducer} from '../features/TodoLists';
import {todolistsReducer} from '../features/TodoLists';
import {v1} from 'uuid';
import {appReducer} from '../features/Application';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Auth';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {HashRouter} from 'react-router-dom';
import {AppRootState, rootReducerType} from '../utils/types';
import {TaskPriorities, TaskStatuses} from '../api/types';

const rootReducer: rootReducerType = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})

const initialGlobalState = {
	todolists: [
		{id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
		{id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'loading'}
	] ,
	tasks: {
		["todolistId1"]: [
			{id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
			{id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
		],
		["todolistId2"]: [
			{id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
			{id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
		]
	},
	app: {
		error: null,
		status: 'succeeded',
		isInitialized: true
	},
	auth: {
		isLoggedIn: true
	},
};

export const storyBookStore = configureStore({
	reducer: rootReducer,
	preloadedState: initialGlobalState as AppRootState,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger)
});


export const ReduxStoreProviderDecorator = (storyFn: any) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: any) => {
	return <HashRouter>{storyFn()}</HashRouter>
}
