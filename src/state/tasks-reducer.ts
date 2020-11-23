import {TaskStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType} from './todolists-reducer';


type removeTaskACType = {
	type: 'REMOVE-TASK'
	taskID: string
	todolistId: string
}

type addTaskACType = {
	type: 'ADD-TASK'
	title: string
	toDoListID: string
}

type changeStatusTaskACType = {
	type: 'CHANGE-STATUS-TASK'
	id: string
	isDone: boolean
	toDoListID: string
}

type changeTitleTaskACType = {
	type: 'CHANGE-TITLE-TASK'
	id: string
	title: string
	toDoListID: string
}


type ActionsType =
	removeTaskACType
	| addTaskACType
	| changeStatusTaskACType
	| changeTitleTaskACType
	| addTodoListActionType
	| removeTodoListActionType

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
			const tasks = stateCopy[action.toDoListID]
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				isDone: false
			}
			const newTasks = [newTask, ...tasks]
			stateCopy[action.toDoListID] = newTasks
			return stateCopy
		}
		case 'CHANGE-STATUS-TASK': {
			const stateCopy = {...state};
			const findToDoList = state[action.toDoListID];
			const task = findToDoList.find(task => task.id === action.id);
			if (task) {
				task.isDone = action.isDone;
			}
			return stateCopy
		}

		case 'CHANGE-TITLE-TASK': {
			const stateCopy = {...state};
			const findToDoList = state[action.toDoListID];
			const task = findToDoList.find(task => task.id === action.id);
			if (task) {
				task.title = action.title;
			}
			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = {...state};

			stateCopy[action.todolistId] = []
			return stateCopy

		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = {...state};
			delete stateCopy[action.id]
			return stateCopy

		}
		default:
			return state
	}
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskACType => {
	return {type: 'REMOVE-TASK', taskID, todolistId}
}

export const addTaskAC = (title: string, toDoListID: string): addTaskACType => {
	return {type: 'ADD-TASK', title, toDoListID}
}

export const changeStatusTaskAC = (id: string, isDone: boolean, toDoListID: string): changeStatusTaskACType => {
	return {type: 'CHANGE-STATUS-TASK', id, isDone, toDoListID}
}

export const changeTitleTaskAC = (id: string, title: string, toDoListID: string): changeTitleTaskACType => {
	return {type: 'CHANGE-TITLE-TASK', id, title, toDoListID}
}

