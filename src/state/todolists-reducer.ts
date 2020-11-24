import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../AppWithRedux';


export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}

type changeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	id: string
}

type changeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	filter: FilterValuesType
	id: string
}


const initialState: Array<TodoListType> = []


type ActionsType = removeTodoListActionType | addTodoListActionType | changeTodoListTitleActionType | changeTodoListFilterActionType
export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(todolist => todolist.id !== action.id);
		}
		case 'ADD-TODOLIST': {
			return [ {
				id: action.todolistId,
				title: action.title,
				filter: 'all'
			}, ...state]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const filteredList = state.find(todolist => todolist.id === action.id);
			if (filteredList) {
				filteredList.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const filteredList = state.find(todolist => todolist.id === action.id);
			if (filteredList) {
				filteredList.filter = action.filter
			}
			return [...state]
		}
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string): removeTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistTitleAC = (title: string):  addTodoListActionType=> {
	return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (title: string, id: string):  changeTodoListTitleActionType=> {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string):  changeTodoListFilterActionType=> {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
