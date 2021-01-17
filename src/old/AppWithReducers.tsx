import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from '../components/TodoList/TodoList';
import {v1} from 'uuid';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Paper} from '@material-ui/core';
import {
	addTodolistTitleAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC, FilterValuesType,
	removeTodolistAC,
	todolistsReducer
} from '../state/todolists-reducer';
import {AddTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from '../state/tasks-reducer';
import {TaskStatuses, TaskType, TodoTaskPriories} from '../api/todolists_api';



export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducers() {

	const toDoListsFirst = v1();
	const toDoListsSecond = v1();

	const [toDoLists, dispatchToDoListsReducer] = useReducer(todolistsReducer, [
		{id: toDoListsFirst, title: 'Who killed Kennedy?', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
		{id: toDoListsSecond, title: 'What is your fav country?', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
	])

	const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
		[toDoListsFirst]: [
			{
				id: v1(), title: 'Lykaskenko', status: TaskStatuses.Completed, todoListId: toDoListsFirst,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: v1(), title: 'Lincoln', status: TaskStatuses.InProgress, todoListId: toDoListsFirst,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: v1(), title: 'Johnson', status: TaskStatuses.Completed, todoListId: toDoListsFirst,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}
		],
		[toDoListsSecond]: [
			{
				id: v1(), title: 'Great Britain', status: TaskStatuses.InProgress, todoListId: toDoListsSecond,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: v1(), title: 'France', status: TaskStatuses.New, todoListId: toDoListsSecond,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			},
			{
				id: v1(), title: 'Belarus', status: TaskStatuses.Completed, todoListId: toDoListsSecond,
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}
		]
	})

	function addTask(title: string, toDoListID: string) {
		const action = AddTaskAC({
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
		})
		dispatchTasksReducer(action)
	}

	function removeTask(id: string, toDoListID: string) {
		const action = removeTaskAC(id, toDoListID)
		dispatchTasksReducer(action)
	}

	function changeStatus(id: string, status: TaskStatuses, toDoListID: string) {
		const action = updateTaskAC(id, {status}, toDoListID);
		dispatchTasksReducer(action)
	}

	function changeTaskTitle(id: string, newTitle: string, toDoListID: string) {
		const action = updateTaskAC(id, {title: newTitle}, toDoListID);
		dispatchTasksReducer(action)
	}


	function changeFilter(value: FilterValuesType, toDoListID: string) {
		const action = changeTodolistFilterAC(value, toDoListID);
		dispatchToDoListsReducer(action)
	}

	function removeTodoList(toDoListID: string) {
		const action = removeTodolistAC(toDoListID);
		dispatchToDoListsReducer(action)
		dispatchTasksReducer(action)
	}

	function addNewToDoList(title: string) {
		const action = addTodolistTitleAC({
			id: v1(),
			addedDate: '',
			order: 0,
			title
		});
		dispatchToDoListsReducer(action)
		dispatchTasksReducer(action)
	}

	const changeTodoListTitle = (id: string, newTitle: string) => {
		const action = changeTodolistTitleAC(id, newTitle)
		dispatchToDoListsReducer(action)
	}

	return (
		<div className="App">

			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6"></Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container style={{padding: '20px'}}>
					<AddItemForm addItem={addNewToDoList}/>
				</Grid>
				<Grid container spacing={10}>
					{toDoLists.map(toDoList => {
						let tasksForTodoList = tasksObj[toDoList.id];


						if (toDoList.filter === 'completed') {
							tasksForTodoList = tasksObj[toDoList.id].filter(task => task.status === TaskStatuses.New)
						}

						if (toDoList.filter === 'active') {
							tasksForTodoList = tasksObj[toDoList.id].filter(task => task.status === TaskStatuses.Completed)
						}
						return (
							<Grid item>
								<Paper key={toDoList.id} style={{padding: '13px'}}>
									<TodoList
														todolist={toDoList}
														tasks={tasksForTodoList}
														removeTask={removeTask}
														addTask={addTask}
														changeFilter={changeFilter}
														changeStatus={changeStatus}
														key={toDoList.id}
														removeTodoList={removeTodoList}
														changeTaskTitle={changeTaskTitle}
														changeTodoListTitle={changeTodoListTitle}
									/>
								</Paper>
							</Grid>
						)
					})
					}
				</Grid>
			</Container>

		</div>
	);
}

export default AppWithReducers;




