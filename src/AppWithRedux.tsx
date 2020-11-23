import React from 'react';
import './App.css';
import {TodoList} from './TodoList';
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
} from './state/todolists-reducer';
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

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

function AppWithRedux() {

	const dispatch = useDispatch()
	const toDoLists = useSelector<AppRootState, Array<TodoListType>>( state => state.todolists );
	const tasks = useSelector<AppRootState, TaskStateType>( state => state.tasks );


	function addTask(title: string, toDoListID: string) {
		const action = addTaskAC(title, toDoListID)
		dispatch(action)
	}

	function removeTask(id: string, toDoListID: string) {
		const action = removeTaskAC(id, toDoListID)
		dispatch(action)
	}

	function changeStatus(id: string, isDone: boolean, toDoListID: string) {
		const action = changeStatusTaskAC(id, isDone, toDoListID);
		dispatch(action)
	}

	function changeTaskTitle(id: string, newTitle: string, toDoListID: string) {
		const action = changeTitleTaskAC(id, newTitle, toDoListID);
		dispatch(action)
	}


	function changeFilter(value: FilterValuesType, toDoListID: string) {
		const action = changeTodolistFilterAC(value, toDoListID);
		dispatch(action)
	}

	function removeTodoList(toDoListID: string) {
		const action = removeTodolistAC(toDoListID);
		dispatch(action)
	}

	function addNewToDoList(title: string) {
		const action = addTodolistTitleAC(title);
		dispatch(action)
	}

	const changeTodoListTitle = (id: string, newTitle: string) => {
		const action = changeTodolistTitleAC(id, newTitle)
		dispatch(action)
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
						let tasksForTodoList = tasks[toDoList.id];


						if (toDoList.filter === 'completed') {
							tasksForTodoList = tasks[toDoList.id].filter(task => task.isDone === true)
						}

						if (toDoList.filter === 'active') {
							tasksForTodoList = tasks[toDoList.id].filter(task => task.isDone === false)
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

export default AppWithRedux;




