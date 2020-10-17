import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

function App() {

	let [tasks, setTasks] = useState<Array<TaskType>>([
		{id: v1(), title: "Lykaskenko", isDone: false},
		{id: v1(), title: "Lincoln", isDone: false},
		{id: v1(), title: "Johnson", isDone: true}
	]);

	function addTask(title: string) {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks([newTask, ...tasks])
	}

	function changeStatus(id: string, isDone: boolean) {
		let task = tasks.find(task => task.id === id);

		if (task) {
			task.isDone = isDone;
		}
		setTasks([...tasks]);
	}


	function removeTask(id: string) {
		let filteredTasks = tasks.filter(task => task.id !== id)
		setTasks(filteredTasks)
	}

	let [filter, setFilter] = useState<FilterValuesType>('all');

	let tasksForTodoList = tasks;

	function changeFilter(value: FilterValuesType) {
		setFilter(value)
	}

	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(task => task.isDone === true)
	}

	if (filter === 'active') {
		tasksForTodoList = tasks.filter(task => task.isDone === false)
	}

	return (
		<div className="App">
			<TodoList title={'Who killed Kennedy?'}
								tasks={tasksForTodoList}
								removeTask={removeTask}
								addTask={addTask}
								changeFilter={changeFilter}
								changeStatus={changeStatus}
								filter={filter}

			/>
		</div>
	);
}

export default App;




