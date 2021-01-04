import {todolistsAPI, TodoListType} from '../api/todolists_api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatus, setErrorType, setStatusType} from './app-reducer';


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
type changeTodolistEntityStatusACType = {
	type: 'CHANGE-TODOLIST-ENTITY-STATUS'
	id: string
	status: RequestStatusType
}

const initialState: Array<TodoListDomainType> = []

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}


type ActionsType =
	removeTodoListActionType
	| addTodoListActionType
	| changeTodoListTitleActionType
	| changeTodoListFilterActionType
	| setTodoListsActionType
	| setErrorType
	| setStatusType
	| changeTodolistEntityStatusACType


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(todolist => todolist.id !== action.id);
		}
		case 'ADD-TODOLIST': {
			const newTodolist: TodoListDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
			return [newTodolist, ...state]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			// const filteredList = state.find(todolist => todolist.id === action.id);
			// if (filteredList) {
			// 	filteredList.title = action.title
			// }
			// return [...state]
			return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
		}
		case 'CHANGE-TODOLIST-FILTER': {
			// const filteredList = state.find(todolist => todolist.id === action.id);
			// if (filteredList) {
			// 	filteredList.filter = action.filter
			// }
			// return [...state]
			return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
		}
		case 'CHANGE-TODOLIST-ENTITY-STATUS': {
			return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
		}
		case 'SET-TODOLIST': {
			return action.todolist.map(todo => {
				return {
					...todo,
					filter: 'all',
					entityStatus: 'idle'
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
	return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): changeTodoListFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType): changeTodolistEntityStatusACType => {
	return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const
}

export const setTodolistAC = (todolist: Array<TodoListType>): setTodoListsActionType => {
	return {type: 'SET-TODOLIST', todolist}
}


export const fetchTodoListTC = () => {
	return (dispatch: Dispatch<ActionsType>) => {
		dispatch(setAppStatus('loading'))
		todolistsAPI.getTodolists()
			.then(res => {
				dispatch(setTodolistAC(res.data))
				dispatch(setAppStatus('succeeded'))
			})
	}
}

export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
	dispatch(setAppStatus('loading'))
	dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))

	todolistsAPI.deleteTodolist(todolistId)
		.then((res) => {
			dispatch(removeTodolistAC(todolistId))
			dispatch(setAppStatus('succeeded'))
		})

}

export const addTodoListTC = (title: string) => {
	return (dispatch: Dispatch<ActionsType>) => {
		dispatch(setAppStatus('loading'))
		todolistsAPI.createTodolist(title)
			.then((res) => {
				dispatch(addTodolistTitleAC(res.data.data.item))
				dispatch(setAppStatus('succeeded'))
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