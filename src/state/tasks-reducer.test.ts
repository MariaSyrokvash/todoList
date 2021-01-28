import {
	removeTaskAC,
	setTasksAC,
	tasksReducer, updateTaskAC, addTaskAC
} from './tasks-reducer';
import {TaskStateType} from '../old/AppLocalState';
import {addTodolistTitleAC, removeTodolistAC, setTodolistAC} from './todolists-reducer';
import {TaskStatuses, TodoTaskPriories} from '../api/todolists_api';


let startState: TaskStateType = {}

beforeEach(() => {
	startState = {
		'todolistId1': [
			{
				id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}
		],
		'todolistId2': [
			{
				id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId1',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}
		]
	};
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAC({taskID: '2', todolistId: 'todolistId2'},);
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(2);
	expect(endState['todolistId2'].every(t => t.id != '2')).toBeFalsy();

});


test('correct task should be added to correct array', () => {
	const action = addTaskAC(
		{
			todoListId: 'todolistId2',
			title: 'juice',
			status: TaskStatuses.New,
			addedDate: '',
			deadline: '',
			description: '',
			startDate: '',
			order: 0,
			priority: 0,
			id: 'exists'
		});

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(4);
	expect(endState['todolistId2'][0].id).toBeDefined();
	expect(endState['todolistId2'][0].title).toBe('juice');
	expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
	const action = updateTaskAC({id: '2', model: {status: TaskStatuses.New}, toDoListID: 'todolistId2'});

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)

});


test('title of specified task should be changed', () => {
	const action = updateTaskAC({id: '2', model: {title: 'snickers'}, toDoListID: 'todolistId2'});

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].title).toBe('snickers')
	expect(endState['todolistId1'][1].title).toBe('JS')
});


test('new property should be added when new todolist is added', () => {

	const action = addTodolistTitleAC({
		todolist: {
			id: '1111',
			title: 'new todolist',
			order: 0,
			addedDate: ''
		}
	});

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState);
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

	const action = removeTodolistAC({todolistId: 'todolistId2'});

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState['todolistId2']).not.toBeDefined();
});

test('empty arrays should be added whrn we set todolists', () => {

	const action = setTodolistAC({
		todolist: [
			{id: '1', title: 'Who killed Kennedy?', order: 0, addedDate: ''},
			{id: '2', title: 'What is your fav country?', order: 0, addedDate: ''}
		]
	})

	const endState = tasksReducer({}, action)

	const keys = Object.keys(endState);
	expect(keys.length).toBe(2);
	expect(endState['1']).toStrictEqual([])
	expect(endState['2']).toStrictEqual([])
});

test('tasks should be added for todolist', () => {

	const action = setTasksAC({tasks: startState['todolistId1'], todolistID: 'todolistId1'})

	const endState = tasksReducer({
		'todolistId2': [],
		'todolistId1': []
	}, action)


	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(0)
});

