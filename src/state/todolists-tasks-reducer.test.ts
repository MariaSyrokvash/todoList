import {TaskStateType} from '../App';
import {addTodolistTitleAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TodoListType} from '../api/todolists_api';

test('ids should be equals', () => {
	const startTasksState: TaskStateType = {};
	const startTodolistsState: Array<TodoListType> = [];

	let todolist: TodoListType = {
		title: 'New Todolist',
		id: 'any id',
		addedDate: '',
		order: 0
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
