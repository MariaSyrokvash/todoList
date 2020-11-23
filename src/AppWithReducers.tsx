import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
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
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {act} from 'react-dom/test-utils';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducers() {

	const toDoListsFirst = v1();
	const toDoListsSecond = v1();

	const [toDoLists, dispatchToDoListsReducer] = useReducer(todolistsReducer, [
		{id: toDoListsFirst, title: 'Who killed Kennedy?', filter: 'all'},
		{id: toDoListsSecond, title: 'What is your fav country?', filter: 'all'}
	])

	const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
		[toDoListsFirst]: [
			{id: v1(), title: 'Lykaskenko', isDone: false},
			{id: v1(), title: 'Lincoln', isDone: false},
			{id: v1(), title: 'Johnson', isDone: true}
		],
		[toDoListsSecond]: [
			{id: v1(), title: 'Great Britain', isDone: false},
			{id: v1(), title: 'France', isDone: false},
			{id: v1(), title: 'Belarus', isDone: true}
		]
	})

	function addTask(title: string, toDoListID: string) {
		const action = addTaskAC(title, toDoListID)
		dispatchTasksReducer(action)
	}

	function removeTask(id: string, toDoListID: string) {
		const action = removeTaskAC(id, toDoListID)
		dispatchTasksReducer(action)
	}

	function changeStatus(id: string, isDone: boolean, toDoListID: string) {
		const action = changeStatusTaskAC(id, isDone, toDoListID);
		dispatchTasksReducer(action)
	}

	function changeTaskTitle(id: string, newTitle: string, toDoListID: string) {
		const action = changeTitleTaskAC(id, newTitle, toDoListID);
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
		const action = addTodolistTitleAC(title);
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
							tasksForTodoList = tasksObj[toDoList.id].filter(task => task.isDone === true)
						}

						if (toDoList.filter === 'active') {
							tasksForTodoList = tasksObj[toDoList.id].filter(task => task.isDone === false)
						}
						return (
							<Grid item>
								<Paper key={toDoList.id} style={{padding: '13px'}}>
									<TodoList title={toDoList.title}
														tasks={tasksForTodoList}
														removeTask={removeTask}
														addTask={addTask}
														changeFilter={changeFilter}
														changeStatus={changeStatus}
														filter={toDoList.filter}
														id={toDoList.id}
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




