import React, {useState} from 'react';
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
import {TaskStatuses, TaskType, TodoTaskPriories} from '../api/todolists_api';
import {FilterValuesType, TodoListDomainType} from '../state/todolists-reducer';

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppLocalState() {
	const toDoListsFirst = v1();
	const toDoListsSecond = v1();

	const [toDoLists, setToDoList] = useState<Array<TodoListDomainType>>([
		{id: toDoListsFirst, title: 'Who killed Kennedy?', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
		{
			id: toDoListsSecond,
			title: 'What is your fav country?',
			filter: 'all',
			order: 0,
			addedDate: '',
			entityStatus: 'idle'
		}
	])

	const [tasksObj, setTasks] = useState<TaskStateType>({
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
		const newTask: TaskType = {
			id: v1(),
			title: title,
			status: TaskStatuses.New,
			todoListId: toDoListID,
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
		}
		const findToDoList = tasksObj[toDoListID]
		tasksObj[toDoListID] = [newTask, ...findToDoList]
		setTasks({...tasksObj})
	}

	function removeTask(id: string, toDoListID: string) {
		const findToDoList = tasksObj[toDoListID]
		console.log(findToDoList)
		tasksObj[toDoListID] = findToDoList.filter(task => task.id !== id)
		setTasks({...tasksObj})
	}

	function changeStatus(id: string, status: TaskStatuses, toDoListID: string) {
		const findToDoList = tasksObj[toDoListID]
		const task = findToDoList.find(task => task.id === id);
		if (task) {
			task.status = status;
			setTasks({...tasksObj});
		}
	}

	function changeTaskTitle(id: string, newTitle: string, toDoListID: string) {
		const findToDoList = tasksObj[toDoListID]
		const task = findToDoList.find(task => task.id === id);
		if (task) {
			task.title = newTitle;
			setTasks({...tasksObj});
		}
	}


	function changeFilter(value: FilterValuesType, toDoListID: string) {
		const findToDoList = toDoLists.find(todoList => todoList.id === toDoListID)

		if (findToDoList) {
			findToDoList.filter = value;
			setToDoList([...toDoLists])
		}
	}

	function removeTodoList(toDoListID: string) {
		const findToDoList = toDoLists.filter(todo => todo.id !== toDoListID)
		setToDoList(findToDoList)
		delete tasksObj[toDoListID]
		setTasks({...tasksObj})
	}

	function addNewToDoList(title: string) {
		const toDoList: TodoListDomainType = {
			id: v1(),
			filter: 'all',
			title: title,
			addedDate: '',
			order: 0,
			entityStatus: 'idle'
		}
		setToDoList([toDoList, ...toDoLists]);
		setTasks({
			...tasksObj,
			[toDoList.id]: []
		})
	}

	const changeTodoListTitle = (id: string, newTitle: string) => {
		const todolist = toDoLists.filter(todo => todo.id === id)

		if (todolist) {
			todolist[0].title = newTitle;
			setToDoList([...toDoLists])
		}
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

export default AppLocalState;




