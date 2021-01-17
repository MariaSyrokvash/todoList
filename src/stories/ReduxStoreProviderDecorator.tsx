import {Provider} from 'react-redux';
import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {v1} from 'uuid';
import {AppRootState} from '../state/store';
import {TaskStatuses, TodoTaskPriories} from '../api/todolists_api';
import {appReducer} from '../state/app-reducer';
import thunk from 'redux-thunk';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
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
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''},
			{id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''}
		],
		["todolistId2"]: [
			{id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''},
			{id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''}
		]
	},
	app: {
		error: null,
		status: 'idle',
		isInitialized: false
	},
	auth: {
		isLoggedIn: false
	},
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: any) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}