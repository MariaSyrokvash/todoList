import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppStatus} from '../../app/app-reducer';
import {FieldErrorType, TaskType, todolistsAPI, UpdateTaskModel} from '../../api/todolists_api';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {AppRootState, ThunkError} from '../../app/store';
import {asyncActions as todolistsAsyncActions} from './todolists-reducer';
import {TaskStateType} from '../../app/App';
import {AxiosError} from 'axios';

const initialState: TaskStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistID: string, thunkAPI) => {
	thunkAPI.dispatch(setAppStatus({status: 'loading'}))
	const response = await todolistsAPI.getTasks(todolistID)
	const tasks = response.data.items
	thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
	return {tasks, todolistID}
	// catch (e) {
	// 	handleNetworkError(e.message, thunkAPI.dispatch)
	// }
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskID: string }, thunkAPI) => {
	const res = await todolistsAPI.deleteTask(param.todolistId, param.taskID)
	// thunkAPI.dispatch(removeTaskAC({taskID: param.taskID, todolistId: param.toDoListID}))
	return {taskID: param.taskID, todolistId: param.todolistId}
	// .catch(error => {
	// 	handleNetworkError(error.message, thunkAPI.dispatch)
	// })
})


export const addTask = createAsyncThunk<TaskType, { title: string, toDoListID: string }, ThunkError>('tasks/addTask', async (param,
	thunkAPI
) => {
	thunkAPI.dispatch(setAppStatus({status: 'loading'}))
	try {
		const res = await todolistsAPI.createTask(param.toDoListID, param.title)
		if (res.data.resultCode === 0) {
			const task = res.data.data.item
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			return task
		} else {
			handleServerError(res.data, thunkAPI.dispatch, false)
			return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
		}
	} catch (err) {
		return  handleNetworkError(err, thunkAPI, false)
	}
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskID: string, domainModel: UpdateDomainTaskModelType, toDoListID: string },
	thunkAPI
) => {
	const state = thunkAPI.getState() as AppRootState
	const task = state.tasks[param.toDoListID].find(task => task.id === param.taskID)

	if (!task) return thunkAPI.rejectWithValue(null)

	const apiModel: UpdateTaskModel = {
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
			// dispatch(updateTaskAC({id: param.taskID, model: param.domainModel, toDoListID: param.toDoListID}))
			// return  {id: param.taskID, model: param.domainModel, toDoListID: param.toDoListID}
			return param
		} else {
			handleServerError(res.data, thunkAPI.dispatch)
			return thunkAPI.rejectWithValue(null)
		}
	} catch (error) {
		handleNetworkError(error.message, thunkAPI)
		return thunkAPI.rejectWithValue(null)
	}
})

export const asyncActions = {
	fetchTasks,
	removeTask,
	addTask,
	updateTask
}

const slice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		// removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
		// 	const tasks = state[action.payload.todolistId]
		// 	const index = tasks.findIndex(task => task.id !== action.payload.taskID)
		//
		// 	if (index > -1) {
		// 		tasks.splice(index, 1)
		// 	}
		// },
		// addTaskAC(state, action: PayloadAction<TaskType>) {
		// 	state[action.payload.todoListId].unshift(action.payload)
		// },
		// updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModelType, toDoListID: string }>) {
		// 	const tasks = state[action.payload.toDoListID]
		// 	const index = tasks.findIndex(task => task.id === action.payload.id)
		//
		// 	if (index > -1) {
		// 		tasks[index] = {...tasks[index], ...action.payload.model}
		// 	}
		// },
		// setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) {
		// 	state[action.payload.todolistID] = action.payload.tasks
		// }
	},
	extraReducers: (builder) => {
		builder.addCase(todolistsAsyncActions.addTodoList.fulfilled, (state, action) => {
			state[action.payload.todolist.id] = []
		});
		builder.addCase(todolistsAsyncActions.removeTodoList.fulfilled, (state, action) => {
			delete state[action.payload.todolistId]
		});
		builder.addCase(todolistsAsyncActions.fetchTodoList.fulfilled, (state, action) => {
			action.payload.todolist.forEach((todo: any) => {
				state[todo.id] = []
			})
		});
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state[action.payload.todolistID] = action.payload.tasks
		});
		builder.addCase(removeTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(task => task.id !== action.payload.taskID)

			if (index > -1) {
				tasks.splice(index, 1)
			}
		});
		builder.addCase(addTask.fulfilled, (state, action) => {
			state[action.payload.todoListId].unshift(action.payload)
		});
		builder.addCase(updateTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.toDoListID]
			const index = tasks.findIndex(task => task.id === action.payload.taskID)

			if (index > -1) {
				tasks[index] = {...tasks[index], ...action.payload.domainModel}
			}
		})
	}
})
// 	[addTodolistTitleAC.type]: (state, action: PayloadAction<{ }>) => {},
// [removeTodolistAC.type]: (state, action: PayloadAction<{ }>) => {},
// [setTodolistAC.type]: (state, action: PayloadAction<{ }>) => {}


export const tasksReducer = slice.reducer

// export const {} = slice.actions

// export const fetchTasksTC = (todolistID: string) => {
// 	return (dispatch: Dispatch) => {
// 		dispatch(setAppStatus({status: 'loading'}))
// 		todolistsAPI.getTasks(todolistID)
// 			.then(res => {
// 					// dispatch(setTasksAC({tasks: res.data.items, todolistID: todolistID}))
// 					dispatch(setAppStatus({status: 'succeeded'}))
// 				}
// 			)
// 			.catch(error => {
// 				handleNetworkError(error.message, dispatch)
// 			})
// 	}
//
// }

// export const removeTaskTC = (taskID: string, toDoListID: string) => {
// 	return (dispatch: Dispatch) => {
// 		todolistsAPI.deleteTask(toDoListID, taskID)
// 			.then((res) => {
// 				dispatch(removeTaskAC({taskID: taskID, todolistId: toDoListID}))
// 			})
// 			.catch(error => {
// 				handleNetworkError(error.message, dispatch)
// 			})
// 	}
// }

// export const addTaskTC = (title: string, toDoListID: string) => {
// 	return (dispatch: Dispatch) => {
// 		dispatch(setAppStatus({status: 'loading'}))
// 		todolistsAPI.createTask(toDoListID, title)
// 			.then((res) => {
// 				if (res.data.resultCode === 0) {
// 					const task = res.data.data.item
// 					const action = addTaskAC(task)
// 					dispatch(action)
// 					dispatch(setAppStatus({status: 'succeeded'}))
// 				} else {
// 					handleServerError(res.data, dispatch)
// 				}
// 			})
// 			.catch(error => {
// 				handleNetworkError(error.message, dispatch)
// 			})
// 	}
// }

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: number
	priority?: number
	startDate?: string
	deadline?: string
}

//
// export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, toDoListID: string) => {
// 	return (dispatch: Dispatch, getState: () => AppRootState) => {
// 		const state = getState()
// 		const task = state.tasks[toDoListID].find(task => task.id === taskID)
//
// 		if (!task) return
//
// 		const apiModel: UpdateTaskModel = {
// 			deadline: task.deadline,
// 			description: task.description,
// 			priority: task.priority,
// 			startDate: task.startDate,
// 			title: task.title,
// 			status: task.status,
// 			...domainModel
// 		}
// 		todolistsAPI.updateTask(toDoListID, taskID, apiModel)
// 			.then((res) => {
// 				if (res.data.resultCode === 0) {
// 					dispatch(updateTaskAC({id: taskID, model: domainModel, toDoListID: toDoListID}))
// 				} else {
// 					handleServerError(res.data, dispatch)
// 				}
// 			})
// 			.catch(error => {
// 				handleNetworkError(error.message, dispatch)
// 			})
// 	}
// }
