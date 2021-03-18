import {
	addTodoList, changeTodolistEntityStatus,
	changeTodolistFilter, changeTodolistTitle, fetchTodoList, removeTodoList, TodoListDomainType,
	todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../../app/App';
import {TodoListType} from '../../api/todolists_api';
import {RequestStatusType} from '../Application/application-reducer';

let startState: Array<TodoListDomainType> = []
console.log(startState)

let todolistId1: string
let todolistId2: string

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
		{id: todolistId2, title: 'What is your fav country?', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
	]
})


test('correct todolist should be removed', () => {

	const endState = todolistsReducer(startState, removeTodoListTC.fulfilled({todolistId: todolistId1}, 'req1', 'todolistId1'))

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

	let todolist: TodoListType = {
		title: 'New Todolist',
		id: 'any id',
		addedDate: '',
		order: 0
	};

	const endState = todolistsReducer(startState, addTodoListTC.fulfilled({todolist: todolist}, 'requestId', todolist.title))

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(todolist.title);
	expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
	let newTodolistTitle = 'New Todolist';

	const payload = {title: newTodolistTitle, id: todolistId2}
	const action = changeTodolistTitleTC.fulfilled(payload, 'requestId', payload)
	const endState = todolistsReducer(startState, action);

	expect(endState[0].title).toBe('What to learn');
	expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
	let newFilter: FilterValuesType = 'completed';

	const endState = todolistsReducer(startState, changeTodolistFilter({filter: newFilter, id: todolistId2}));

	expect(endState[0].filter).toBe('all');
	expect(endState[1].filter).toBe(newFilter);
});


test('todolist should be set to the stet', () => {
	const action = fetchTodoListTC.fulfilled({todolist: startState}, 'requestId')

	const endState = todolistsReducer([], action)

	expect(endState.length).toBe(2)
})


test('correct entity status of todolist should be changed', () => {
	let newStatus: RequestStatusType = 'loading';

	const endState = todolistsReducer(startState, changeTodolistEntityStatus({status: newStatus, id: todolistId2,}));

	expect(endState[0].entityStatus).toBe('idle');
	expect(endState[1].entityStatus).toBe(newStatus);
	expect(endState[1].entityStatus).toBe('loading');
});