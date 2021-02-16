import {todolistsAPI} from '../../api/todolists_api';
import {RequestStatusType} from '../Application';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleNetworkError, handleServerError} from '../../utils/error-utils';
import {ThunkError} from '../../utils/types';
import {TodoListType} from '../../app/App';
import {appActions} from '../CommonActions/CommonActions';


export type removeTodoListActionType = ({ type: 'REMOVE-TODOLIST', id: string })
export type addTodoListActionType = ({ type: 'ADD-TODOLIST', todolist: TodoListType })
type changeTodoListTitleActionType = ({ type: 'CHANGE-TODOLIST-TITLE', title: string, id: string })
type changeTodoListFilterActionType = ({ type: 'CHANGE-TODOLIST-FILTER', filter: FilterValuesType, id: string })
export type setTodoListsActionType = ({ type: 'SET-TODOLIST', todolist: Array<TodoListType> })
type changeTodolistEntityStatusACType = ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: string, status: RequestStatusType })
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodoListType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

type ActionsType =
	removeTodoListActionType
	| addTodoListActionType
	| changeTodoListTitleActionType
	| changeTodoListFilterActionType
	| setTodoListsActionType
	| changeTodolistEntityStatusACType


const fetchTodoList = createAsyncThunk<{ todolist: TodoListType[] }, undefined, ThunkError>('todolists/fetchTodoList', async (param, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await todolistsAPI.getTodolists()
		thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
		return {todolist: res.data}
	} catch (error) {
		return handleNetworkError(error, thunkAPI)
	}
})

const removeTodoList = createAsyncThunk<{ todolistId: string }, string, ThunkError>('todolists/removeTodolist', async (todolistId, {
	dispatch,
	rejectWithValue
}) => {
	//изменим глобальный статус приложения, чтобы вверху полоса побежала
	dispatch(appActions.setAppStatus({status: 'loading'}))
	//изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
	dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
	const res = await todolistsAPI.deleteTodolist(todolistId)
	//скажем глобально приложению, что асинхронная операция завершена
	dispatch(appActions.setAppStatus({status: 'succeeded'}))
	return {todolistId: todolistId}
})

const addTodoList = createAsyncThunk<{ todolist: TodoListType }, string, ThunkError>('todolists/addTodoList', async (title, thunkAPI) => {
	thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		const res = await todolistsAPI.createTodolist(title)
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {todolist: res.data.data.item}
		} else {
			return handleServerError(res.data, thunkAPI, false)
		}
	} catch (err) {
		return handleNetworkError(err, thunkAPI, false)
	}
})

const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { title: string, id: string }, thunkAPI) => {
	try {
		const res = await todolistsAPI.updateTodolistTitle(param.id, param.title)
		if (res.data.resultCode === 0) {
			thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {title: param.title, id: param.id}
		} else {
			return handleServerError(res.data, thunkAPI, true)
		}
	} catch (err) {
		return handleNetworkError(err, thunkAPI, false)
	}
})


export const asyncActions = {
	fetchTodoList,
	removeTodoList,
	addTodoList,
	changeTodolistTitle,
}

export const slice = createSlice({
	name: 'todolists',
	initialState: [] as Array<TodolistDomainType>,
	reducers: {
		changeTodolistFilter(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].filter = action.payload.filter
		},
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id)
			state[index].entityStatus = action.payload.status
		},
	},
	extraReducers: (builder => {
		builder
			.addCase(fetchTodoList.fulfilled, (state, action) => {
				return action.payload.todolist.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
			})
			.addCase(removeTodoList.fulfilled, (state, action) => {
				const index = state.findIndex(tl => tl.id === action.payload.todolistId)

				if (index > -1) {
					state.splice(index, 1)
				}
			})
			.addCase(addTodoList.fulfilled, (state, action) => {
				state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
			})
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const index = state.findIndex(tl => tl.id === action.payload.id)
				state[index].title = action.payload.title
			})
	})
})
export const {
	changeTodolistEntityStatus,
	changeTodolistFilter,
} = slice.actions