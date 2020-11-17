import React, {useState} from 'react';
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

function App() {

	const toDoListsFirst = v1();
	const toDoListsSecond = v1();

	const [toDoLists, setToDoList] = useState<Array<TodoListType>>([
		{id: toDoListsFirst, title: 'Who killed Kennedy?', filter: 'all'},
		{id: toDoListsSecond, title: 'What is your fav country?', filter: 'all'}
	])

	const [tasksObj, setTasks] = useState<TaskStateType>({
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
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
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

	function changeStatus(id: string, isDone: boolean, toDoListID: string) {
		const findToDoList = tasksObj[toDoListID]
		const task = findToDoList.find(task => task.id === id);
		if (task) {
			task.isDone = isDone;
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
		const toDoList: TodoListType = {
			id: v1(),
			filter: 'all',
			title: title
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
				<Grid container style={ {padding: '20px'} }>
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
								<Paper key={toDoList.id} style={ {padding: '13px'}}>
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

export default App;




