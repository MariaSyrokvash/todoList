import axios from 'axios';
import {GenericResponseType, GetTasksResponse, TaskType, TodolistType, UpdateTaskModelType} from './types';

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': '0e95a4fa-922c-4e5c-96fa-c712f53359b8'
	}
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings
})



export const todolistsAPI = {
	getTodolists: function () {
		return instance.get<Array<TodolistType>>('todo-lists')
	},

	createTodolist(title: string) {
		return instance.post<GenericResponseType<{ item: TodolistType }>>(`todo-lists/`, {title})
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<GenericResponseType>(`todo-lists/${todolistId}`)
	},

	updateTodolistTitle(todolistId: string, title: string) {
		return instance.put<GenericResponseType>(`todo-lists/${todolistId}`, {title})
	},

	getTasks(todoListId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
	},

	deleteTask(todolistId: string, taskID: string) {
		debugger
		return instance.delete<GenericResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`)
	},

	createTask(todolistId: string, title: string) {
		return instance.post<GenericResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
	},

	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
	}
}

export type LoginParamsType = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}

export const authAPI = {
	login(data: LoginParamsType) {
		const promise = instance.post<GenericResponseType<{userId?: number}>>('auth/login', data)
		return promise
	},
	me() {
		const promise = instance.get<GenericResponseType<{id: number; email: string; login: string}>>('auth/me')
		return promise
	},
	logout() {
		const promise = instance.delete<GenericResponseType<{userId?: number}>>('auth/login')
		return promise
	}
}