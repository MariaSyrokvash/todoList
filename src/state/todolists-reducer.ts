import {v1} from 'uuid';
import {todolistsAPI, TodoListType} from '../api/todolists_api';
import {Dispatch} from 'redux';


export type removeTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type addTodoListActionType = {
	type: 'ADD-TODOLIST'
	todolist: TodoListType
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

export type setTodoListsActionType = {
	type: 'SET-TODOLIST'
	todolist: Array<TodoListType>
}

const initialState: Array<TodoListDomainType> = []

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & {
	filter: FilterValuesType
}


type ActionsType =
	removeTodoListActionType
	| addTodoListActionType
	| changeTodoListTitleActionType
	| changeTodoListFilterActionType
	| setTodoListsActionType

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(todolist => todolist.id !== action.id);
		}
		case 'ADD-TODOLIST': {
			const newTodolist: TodoListDomainType = {...action.todolist, filter: 'all'}
			return [newTodolist, ...state]
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
		case 'SET-TODOLIST': {
			return action.todolist.map(todo => {
				return {
					...todo,
					filter: 'all'
				}
			})
		}
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string): removeTodoListActionType => {
	return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistTitleAC = (todolist: TodoListType): addTodoListActionType => {
	return {type: 'ADD-TODOLIST', todolist}
}

export const changeTodolistTitleAC = (title: string, id: string): changeTodoListTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): changeTodoListFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}


export const setTodolistAC = (todolist: Array<TodoListType>): setTodoListsActionType => {
	return {type: 'SET-TODOLIST', todolist}
}


export const fetchTodoListTC = () => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.getTodolists()
			.then(res => {
				dispatch(setTodolistAC(res.data))
			})
	}
}

export const removeTodoListTC = (todolistId: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.deleteTodolist(todolistId)
			.then(() => {
				dispatch(removeTodolistAC(todolistId))
			})
	}
}

export const addTodoListTC = (title: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.createTodolist(title)
			.then((res) => {
				dispatch(addTodolistTitleAC(res.data.data.item))
			})
	}
}


export const changeTodolistTitleTC = (title: string, id: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.updateTodolistTitle(id, title)
			.then(res => {
				dispatch(changeTodolistTitleAC(title, id))
			})
	}
}