import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
	filter: FilterValuesType
	title: string
	tasks: Array<TaskType>
	addTask: (title: string) => void
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
	const [newTaskTitle, setTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}
	const onCLickAddTaskHandler = () => {
		if(newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle.trim());
			setTitle('');
		} else {
			setError('This field is required')
		}
	}
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null);

		if(newTaskTitle.trim() !== '') {
			if (event.charCode === 13) {
				props.addTask(newTaskTitle);
				setTitle('');
			}
		} else {
			setError('This field is required')
		}
  }

	const onCLickAllFilterHandler = () => {
		props.changeFilter('all')
	}
	const onCLickActiveFilterHandler = () => {
		props.changeFilter('active')
	}
	const onCLickCompletedFilterHandler = () => {
		props.changeFilter('completed')
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? 'input-error': ''}/>
				<button onClick={onCLickAddTaskHandler}
        >+</button>
			</div>
			{error && <div className='error-message'>{error}</div>}
			<ul>
				{
					props.tasks.map(task => {
            const removeTaskHandler = () => { props.removeTask(task.id)}
						const changeStatus = (event: ChangeEvent<HTMLInputElement>) => { props.changeStatus(task.id, event.currentTarget.checked)}
						return <li key={task.id} className={task.isDone ? 'completed' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={changeStatus}/>
							<span>{task.title}</span>
							<button onClick={removeTaskHandler}>x
							</button>
						</li>

					})
				}
			</ul>
			<div>
				<button onClick={onCLickAllFilterHandler} className={props.filter === 'all'? 'active-btn' : ''}>All</button>
				<button onClick={onCLickActiveFilterHandler} className={props.filter === 'active'? 'active-btn' : ''}>Active</button>
				<button onClick={onCLickCompletedFilterHandler} className={props.filter === 'completed'? 'active-btn' : ''}>Completed</button>
			</div>
		</div>
	)
}