import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {todolistsAPI} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {asyncActions as todolistsAsyncActions} from './todolists-reducer';
import {TaskStateType} from '../../app/App';
import {AppRootState, ThunkError} from '../../utils/types';
import {TaskType, UpdateTaskModelType} from '../../api/types';
import {appActions} from '../CommonActions/CommonActions';

const initialState: TaskStateType = {}

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await todolistsAPI.getTasks(todolistId)
		const tasks = res.data.items
		thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
		return {tasks, todolistId}
	} catch (error) {
		return handleServerError(error, thunkAPI)
	}
})

export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTask',
	async (param, thunkAPI) => {
	debugger
		const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
		return {taskId: param.taskId, todolistId: param.todolistId}
	})


export const addTask = createAsyncThunk<TaskType, { title: string, toDoListID: string }, ThunkError>('tasks/addTask', async (param,
																																																														 thunkAPI
) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await todolistsAPI.createTask(param.toDoListID, param.title)
		if (res.data.resultCode === 0) {
			const task = res.data.data.item
			thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return task
		} else {
			handleServerError(res.data, thunkAPI, false)
			return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
		}
	} catch (err) {
		return handleNetworkError(err, thunkAPI, false)
	}
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskID: string, domainModel: UpdateDomainTaskModelType, toDoListID: string },
																																			thunkAPI
) => {
	const state = thunkAPI.getState() as AppRootState
	const task = state.tasks[param.toDoListID].find(task => task.id === param.taskID)

	if (!task) return thunkAPI.rejectWithValue(null)

	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...param.domainModel
	}
	try {
		const res = await todolistsAPI.updateTask(param.toDoListID, param.taskID, apiModel)
		if (res.data.resultCode === 0) {
			return param
		} else {
			handleServerError(res.data, thunkAPI)
			return thunkAPI.rejectWithValue(null)
		}
	} catch (error) {
		return handleNetworkError(error.message, thunkAPI)
	}
})

export const asyncActions = {
	fetchTasks,
	removeTask,
	addTask,
	updateTask
}

export const slice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(todolistsAsyncActions.addTodoList.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsAsyncActions.removeTodoList.fulfilled, (state, action) => {
				delete state[action.payload.todolistId]
			})
			.addCase(todolistsAsyncActions.fetchTodoList.fulfilled, (state, action) => {
				action.payload.todolist.forEach((todo: any) => {
					state[todo.id] = []
				})
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				debugger
				const tasks = state[action.payload.todolistId]
				const index = tasks.findIndex(task => task.id === action.payload.taskId)

				if (index > -1) {
					tasks.splice(index, 1)
				}
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state[action.payload.todoListId].unshift(action.payload)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.toDoListID]
				const index = tasks.findIndex(task => task.id === action.payload.taskID)

				if (index > -1) {
					tasks[index] = {...tasks[index], ...action.payload.domainModel}
				}
			})
	}
})


export const tasksReducer = slice.reducer

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: number
	priority?: number
	startDate?: string
	deadline?: string
}