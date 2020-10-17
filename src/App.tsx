import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {

	const toDoListsFirst = v1();
	const toDoListsSecond = v1();

	const [toDoLists, setToDoList] = useState<Array<TodoListType>>([
		{id: toDoListsFirst, title: 'Who killed Kennedy?', filter: 'all'},
		{id: toDoListsSecond, title: 'What are some products of the West Indies?', filter: 'all'}
	])

	const [tasks, setTasks] = useState<TaskStateType>({
		[toDoListsFirst]: [
			{id: v1(), title: 'Lykaskenko', isDone: false},
			{id: v1(), title: 'Lincoln', isDone: false},
			{id: v1(), title: 'Johnson', isDone: true}
		],
		[toDoListsSecond]: [
			{id: v1(), title: 'London', isDone: false},
			{id: v1(), title: 'Paris', isDone: false},
			{id: v1(), title: 'Cyprus', isDone: true}
		]
	})

	function addTask(title: string, toDoListID: string) {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		const findToDoList = tasks[toDoListID]
		tasks[toDoListID] = [newTask, ...findToDoList]
		setTasks({...tasks})
	}

	function removeTask(id: string, toDoListID: string) {
		const findToDoList = tasks[toDoListID]
		console.log(findToDoList)
		tasks[toDoListID] = findToDoList.filter(task => task.id !== id)
		setTasks({...tasks})
	}

	function changeStatus(id: string, isDone: boolean, toDoListID: string) {
		const findToDoList = tasks[toDoListID]
		const task = findToDoList.find(task => task.id === id);
		if (task) {
			task.isDone = isDone;
			setTasks({...tasks});
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
		delete tasks[toDoListID]
		setTasks({...tasks})
	}

	return (
		<div className="App">

			{toDoLists.map(toDoList => {
				let tasksForTodoList = tasks[toDoList.id];

				if (toDoList.filter === 'completed') {
					tasksForTodoList = tasks[toDoList.id].filter(task => task.isDone === true)
				}

				if (toDoList.filter === 'active') {
					tasksForTodoList = tasks[toDoList.id].filter(task => task.isDone === false)
				}
				return (
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
					/>
				)
			})
			}
		</div>
	);
}

export default App;




