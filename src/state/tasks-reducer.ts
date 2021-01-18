import {TaskStateType} from '../old/AppLocalState';
import {
	addTodolistTitleAC,
	removeTodolistAC,
	setTodolistAC
} from './todolists-reducer';
import {TaskType, todolistsAPI, UpdateTaskModel} from '../api/todolists_api';
import {Dispatch} from 'redux';
import {AppRootState} from './store';
import {setAppStatus} from './app-reducer';
import {handleNetworkError, handleServerError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: TaskStateType = {}

const slice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex(task => task.id !== action.payload.taskID)

			if (index > -1) {
				tasks.splice(index, 1)
			}
		},
		addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
			state[action.payload.task.todoListId].unshift(action.payload.task)
		},
		updateTaskAC(state, action: PayloadAction<{ id: string, model: UpdateDomainTaskModelType, toDoListID: string }>) {
			const tasks = state[action.payload.toDoListID]
			const index = tasks.findIndex(task => task.id === action.payload.id)

			if (index > -1) {
				tasks[index] = {...tasks[index], ...action.payload.model}
			}
		},
		setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) {
			state[action.payload.todolistID] = action.payload.tasks
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addTodolistTitleAC, (state, action) => {
			state[action.payload.todolist.id] = []
		});
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.todolistId]
		});
		builder.addCase(setTodolistAC, (state, action) => {
			action.payload.todolist.forEach((todo: any) => {
				state[todo.id] = []
			})
		})
	}
})
// 	[addTodolistTitleAC.type]: (state, action: PayloadAction<{ }>) => {},
// [removeTodolistAC.type]: (state, action: PayloadAction<{ }>) => {},
// [setTodolistAC.type]: (state, action: PayloadAction<{ }>) => {}


export const tasksReducer = slice.reducer

export const {removeTaskAC, updateTaskAC, setTasksAC, addTaskAC} = slice.actions

export const fetchTasks = (todolistID: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatus({status: 'loading'}))
		todolistsAPI.getTasks(todolistID)
			.then(res => {
					dispatch(setTasksAC({tasks: res.data.items, todolistID: todolistID}))
					dispatch(setAppStatus({status: 'succeeded'}))
				}
			)
			.catch(error => {
				handleNetworkError(error.message, dispatch)
			})
	}

}

export const removeTaskTC = (taskID: string, toDoListID: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTask(toDoListID, taskID)
			.then((res) => {
				dispatch(removeTaskAC({taskID: taskID, todolistId: toDoListID}))
			})
			.catch(error => {
				handleNetworkError(error.message, dispatch)
			})
	}
}

export const addTaskTC = (title: string, toDoListID: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatus({status: 'loading'}))
		todolistsAPI.createTask(toDoListID, title)
			.then((res) => {
				if (res.data.resultCode === 0) {
					const task = res.data.data.item
					const action = addTaskAC({task: task})
					dispatch(action)
					dispatch(setAppStatus({status: 'succeeded'}))
				} else {
					handleServerError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleNetworkError(error.message, dispatch)
			})
	}
}

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: number
	priority?: number
	startDate?: string
	deadline?: string
}


export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, toDoListID: string) => {
	return (dispatch: Dispatch, getState: () => AppRootState) => {
		const state = getState()
		const task = state.tasks[toDoListID].find(task => task.id === taskID)

		if (!task) return

		const apiModel: UpdateTaskModel = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel
		}
		todolistsAPI.updateTask(toDoListID, taskID, apiModel)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(updateTaskAC({id: taskID, model: domainModel, toDoListID: toDoListID}))
				} else {
					handleServerError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleNetworkError(error.message, dispatch)
			})
	}
}
