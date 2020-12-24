import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListActionType, removeTodoListActionType, setTodoListsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriories} from '../api/todolists_api';
import {Dispatch} from 'redux';


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
	status: TaskStatuses
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
	| addTaskACType
	| changeStatusTaskACType
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
			const tasks = stateCopy[action.toDoListID]
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				status: TaskStatuses.New,
				todoListId: action.toDoListID,
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TodoTaskPriories.Low,
				description: ''
			}
			const newTasks = [newTask, ...tasks]
			stateCopy[action.toDoListID] = newTasks
			return stateCopy
		}
		case 'CHANGE-STATUS-TASK': {
			const findToDoList = state[action.toDoListID];
			state[action.toDoListID] = findToDoList
				.map(task => task.id === action.id ?
					{...task, status: action.status}
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

			stateCopy[action.todolistId] = []
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

export const addTaskAC = (title: string, toDoListID: string): addTaskACType => {
	return {type: 'ADD-TASK', title, toDoListID}
}

export const changeStatusTaskAC = (id: string, status: TaskStatuses, toDoListID: string): changeStatusTaskACType => {
	return {type: 'CHANGE-STATUS-TASK', id, status, toDoListID}
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