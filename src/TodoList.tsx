import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';

type PropsType = {
	id: string
	filter: FilterValuesType
	title: string
	tasks: Array<TaskType>
	addTask: (title: string, toDoListID: string) => void
	removeTask: (id: string, toDoListID: string) => void
	changeFilter: (value: FilterValuesType, id: string) => void
	changeStatus: (id: string, isDone: boolean, toDoListID: string) => void
	removeTodoList: (toDoListID: string) => void
}

export function TodoList(props: PropsType) {

	const onCLickAllFilterHandler = () => props.changeFilter('all', props.id)
	const onCLickActiveFilterHandler = () => props.changeFilter('active', props.id)
	const onCLickCompletedFilterHandler = () => props.changeFilter('completed', props.id)
	const removeTodoList = () => props.removeTodoList(props.id)

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div>
			<div>
				<div className={'box'}>
					<h3>{props.title}</h3>
					<button onClick={removeTodoList}>&#8569;</button>
				</div>
				<AddItemForm addItem={addTask} />
			</div>
			<ul>
				{
					props.tasks.map(task => {
						const removeTaskHandler = () => {
							props.removeTask(task.id, props.id)
						}
						const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(task.id, event.currentTarget.checked, props.id)
						}
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
				<button onClick={onCLickAllFilterHandler} className={props.filter === 'all' ? 'active-btn' : ''}>All</button>
				<button onClick={onCLickActiveFilterHandler} className={props.filter === 'active' ? 'active-btn' : ''}>Active
				</button>
				<button onClick={onCLickCompletedFilterHandler}
								className={props.filter === 'completed' ? 'active-btn' : ''}>Completed
				</button>
			</div>
		</div>
	)
}