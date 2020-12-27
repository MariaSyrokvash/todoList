import {
	addTodolistTitleAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC, setTodolistAC, TodoListDomainType,
	todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../AppWithRedux';
import {TodoListType} from '../api/todolists_api';

let startState: Array<TodoListDomainType> = []

let todolistId1: string
let todolistId2: string

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
		{id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
	]
})

test('correct todolist should be removed', () => {

	const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let todolist: TodoListType = {
		title: 'New Todolist',
		id: 'any id',
		addedDate: '',
		order: 0
	};

	const endState = todolistsReducer(startState, addTodolistTitleAC(todolist))

	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(todolist.title);
	expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
	let newTodolistTitle = 'New Todolist';

	const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

	expect(endState[0].title).toBe('What to learn');
	expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
	let newFilter: FilterValuesType = 'completed';

	const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

	expect(endState[0].filter).toBe('all');
	expect(endState[1].filter).toBe(newFilter);
});


test('todolist should be set to the stet', () => {
	const action = setTodolistAC(startState)

	const endState = todolistsReducer([], action)

	expect(endState.length).toBe(2)
})