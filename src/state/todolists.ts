import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
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


type ActionsType = RemoveTodoListActionType | AddTodoListActionType | changeTodoListTitleActionType | changeTodoListFilterActionType
export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(todolist => todolist.id !== action.id);
		}
		case 'ADD-TODOLIST': {
			return [...state, {
				id: v1(),
				title: action.title,
				filter: 'all'
			}]
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
			throw new Error('I don\'t understand this type')
	}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistTitleAC = (title: string):  AddTodoListActionType=> {
	return { type: 'ADD-TODOLIST', title: title}
}

export const changeTodolistTitleAC = (title: string, id: string):  changeTodoListTitleActionType=> {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string):  changeTodoListFilterActionType=> {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
