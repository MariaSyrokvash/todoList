import {TaskStateType} from '../App';
import {addTodoListActionType, removeTodoListActionType, setTodoListsActionType} from './todolists-reducer';
import {TaskType, todolistsAPI, UpdateTaskModel} from '../api/todolists_api';
import {Dispatch} from 'redux';
import {AppRootState} from './store';


type removeTaskACType = {
	type: 'REMOVE-TASK'
	taskID: string
	todolistId: string
}

type AddTaskACType = {
	type: 'ADD-TASK'
	task: TaskType
}

type UpdateTaskActionType = {
	type: 'UPDATE-TASK'
	id: string
	model: UpdateDomainTaskModelType
	toDoListID: string
}

type changeTitleTaskACType = {
	type: 'CHANGE-TITLE-TASK'
	id: string
	title: string
	toDoListID: string
}

type setTasksActionType = {
	type: 'SET-TASKS'
	tasks: Array<TaskType>
	todolistID: string
}


type ActionsType =
	removeTaskACType
	| AddTaskACType
	| UpdateTaskActionType
	| changeTitleTaskACType
	| addTodoListActionType
	| removeTodoListActionType
	| setTodoListsActionType
	| setTasksActionType

const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = {...state};

			const tasks = state[action.todolistId];
			const filteredTasks = tasks.filter(task => task.id !== action.taskID)

			stateCopy[action.todolistId] = filteredTasks
			return stateCopy

		}
		case 'ADD-TASK': {
			const stateCopy = {...state};
			const newTask: TaskType = action.task
			const tasks = stateCopy[newTask.todoListId]
			const newTasks = [newTask, ...tasks]
			stateCopy[newTask.todoListId] = newTasks
			return stateCopy
		}
		case 'UPDATE-TASK': {
			const findToDoList = state[action.toDoListID];
			state[action.toDoListID] = findToDoList
				.map(task => task.id === action.id ?
					{...task,  ...action.model}
					:
					task
				)
			return ({...state})
		}

		case 'CHANGE-TITLE-TASK': {
			const findToDoList = state[action.toDoListID];
			state[action.toDoListID] = findToDoList
				.map(task => task.id === action.id ?
					{...task, title: action.title}
					:
					task
				)
			return ({...state})
		}
		case 'ADD-TODOLIST': {
			const stateCopy = {...state};

			stateCopy[action.todolist.id] = []
			return stateCopy

		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = {...state};
			delete stateCopy[action.id]
			return stateCopy
		}
		case 'SET-TODOLIST': {
			const stateCopy = {...state};
			action.todolist.forEach((todo) => {
				stateCopy[todo.id] = []
			})
			return stateCopy
		}
		case 'SET-TASKS': {
			const stateCopy = {...state};
			stateCopy[action.todolistID] = action.tasks

			return stateCopy
		}
		default:
			return state
	}
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskACType => {
	return {type: 'REMOVE-TASK', taskID, todolistId}
}

export const AddTaskAC = (task: TaskType): AddTaskACType => {
	return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, toDoListID: string): UpdateTaskActionType => {
	return {type: 'UPDATE-TASK', id, model, toDoListID}
}

export const changeTitleTaskAC = (id: string, title: string, toDoListID: string): changeTitleTaskACType => {
	return {type: 'CHANGE-TITLE-TASK', id, title, toDoListID}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string): setTasksActionType => {
	return {type: 'SET-TASKS', tasks, todolistID}
}

export const fetchTasks = (todolistID: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTasks(todolistID)
			.then(res => dispatch(setTasksAC(res.data.items, todolistID)))
	}
}

export const removeTaskTC = (taskID: string, toDoListID: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.deleteTask(toDoListID, taskID)
			.then((res) => {
				dispatch(removeTaskAC(taskID, toDoListID))
			})
	}
}

export const addTaskTC = (title: string, toDoListID: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.createTask(toDoListID, title)
			.then((res) => {
				const task = res.data.data.item
				const action = AddTaskAC(task)
				dispatch(action)
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
	return (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {
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
			.then(() => {
				dispatch(updateTaskAC(taskID, domainModel, toDoListID))
			})
	}
}
