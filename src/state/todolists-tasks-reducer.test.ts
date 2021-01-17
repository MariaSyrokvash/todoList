import {TaskStateType} from '../old/AppLocalState';
import {
	addTodolistTitleAC,
	changeTodolistEntityStatusAC,
	TodoListDomainType,
	todolistsReducer
} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TodoListType} from '../api/todolists_api';
import {RequestStatusType} from './app-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListDomainType> = []

beforeEach(() => {
	todolistId1 = v1(),
		todolistId2 = v1(),

		startState = [
			{id: todolistId1, title: 'Who killed Kennedy?', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
			{
				id: todolistId2,
				title: 'What is your fav country?',
				filter: 'all',
				entityStatus: 'idle',
				order: 0,
				addedDate: ''
			}
		]
})

test('ids should be equals', () => {
	const startTasksState: TaskStateType = {};
	const startTodolistsState: Array<TodoListDomainType> = [];

	let todolist: TodoListType = {
		title: 'New Todolist',
		id: 'any id',
		addedDate: '',
		order: 0,
	}

	const action = addTodolistTitleAC(todolist);

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.todolist.id);
	expect(idFromTodolists).toBe(action.todolist.id);
});


