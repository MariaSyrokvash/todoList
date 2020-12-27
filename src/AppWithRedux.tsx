import React, {useCallback, useEffect} from 'react';
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
	addTodoListTC,
	changeTodolistFilterAC, changeTodolistTitleTC, fetchTodoListTC, removeTodoListTC, TodoListDomainType,
} from './state/todolists-reducer';
import {
	addTaskTC,
	removeTaskTC, updateTaskTC
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists_api';

export type FilterValuesType = 'all' | 'completed' | 'active'

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
	const toDoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists);
	const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);

	useEffect(() => {
		dispatch(fetchTodoListTC())
	}, [])

	const addTask = useCallback((title: string, toDoListID: string) => {
		dispatch(addTaskTC(title, toDoListID))
	}, [dispatch])

	const removeTask = useCallback((id: string, toDoListID: string) => {
		dispatch(removeTaskTC(id, toDoListID))
	}, [dispatch])

	const changeStatus = useCallback((id: string, status: TaskStatuses, toDoListID: string) => {
		dispatch(updateTaskTC(id, {status: status}, toDoListID))
	}, [dispatch])

	const changeTaskTitle = useCallback((id: string, newTitle: string, toDoListID: string) => {
		dispatch(updateTaskTC(id, {title: newTitle}, toDoListID))
	}, [dispatch])


	const changeFilter = useCallback((value: FilterValuesType, toDoListID: string) => {
		const action = changeTodolistFilterAC(value, toDoListID);
		dispatch(action)
	}, [dispatch])

	const removeTodoList = useCallback((toDoListID: string) => {
		dispatch(removeTodoListTC(toDoListID))
	}, [dispatch])

	const addNewToDoList = useCallback((title: string) => {
		dispatch(addTodoListTC(title))
	}, [dispatch])

	const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
		dispatch(changeTodolistTitleTC(newTitle, id))
	}, [])

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
					{
						toDoLists.map(toDoList => {
							let allTaskForTodoList = tasks[toDoList.id];
							let tasksForTodoList = allTaskForTodoList;

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




