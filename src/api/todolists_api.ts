import axios from 'axios';

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

export type TodoListType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type CreateDataResponseType = {
	item: TodoListType
}

export type ResponseType<R = {}> = {
	resultCode: number
	messages: Array<string>
	data: R
}

type GetTaskType = {
	totalCount: number
	error: null | string
	items: Array<TaskType>
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TodoTaskPriories {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TodoTaskPriories
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateTaskModel = {
	title: string
	description: string
	status: number
	priority: number
	startDate: string
	deadline: string
}


export const todolistsAPI = {
	getTodolists() {
		return instance.get<Array<TodoListType>>('todo-lists')
	},

	createTodolist(title: string) {
		return instance.post<ResponseType<CreateDataResponseType>>(`todo-lists/`, {title})
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},

	updateTodolistTitle(todolistId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
	},

	getTasks(todolistId: string) {
		return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
	},

	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},

	createTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
	},

	updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
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
		const promise = instance.post<ResponseType<{userId?: number}>>('auth/login', data)
		return promise
	},
	me() {
 		const promise = instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
		return promise
	},
	logout() {
		const promise = instance.delete<ResponseType<{userId?: number}>>('auth/login')
		return promise
	}
}

//уже не используются
type _CreateTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	data: {
		item: TodoListType
	}
}

type _UpdateTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}

type _DeleteTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	data: {}
}
