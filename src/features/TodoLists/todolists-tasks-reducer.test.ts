import {TaskStateType} from '../../old/AppLocalState';
import {
	addTodoList,
	TodoListDomainType,
	todolistsReducer,
} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TodoListType} from '../../api/todolists_api';

test('its should be equals', () => {
	const startTasksState: TaskStateType = {};
	const startTodolistsState: Array<TodoListDomainType> = [];

	let todolist: TodoListType = {
		title: 'New Todolist',
		id: 'any id',
		addedDate: '',
		order: 0,
	}

	const action = addTodoListTC.fulfilled({todolist: todolist}, 'requestId', todolist.title);

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.payload.todolist.id);
	expect(idFromTodolists).toBe(action.payload.todolist.id);
});


