import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton, Typography} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {Delete} from '@material-ui/icons';

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
	changeTaskTitle: (id: string, newTitle: string, toDoListID: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

	const onCLickAllFilterHandler = () => props.changeFilter('all', props.id)
	const onCLickActiveFilterHandler = () => props.changeFilter('active', props.id)
	const onCLickCompletedFilterHandler = () => props.changeFilter('completed', props.id)
	const removeTodoList = () => props.removeTodoList(props.id)

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const changeTodoListTitle = (newTitle: string) => {
		props.changeTodoListTitle(props.id, newTitle)
	}

	return (
		<div>
			<div>
				<div className={'box'}>
					<Typography variant={'h5'}>
						<EditableSpan title={props.title} onChangeInTitleTask={changeTodoListTitle}/>
						<IconButton onClick={removeTodoList} color={'primary'}><Delete/></IconButton>
					</Typography>
				</div>
				<AddItemForm addItem={addTask}/>
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

						const changeValueHandler = (newValue: string) => {
							props.changeTaskTitle(task.id, newValue, props.id)
						}

						return <li key={task.id} className={task.isDone ? 'completed' : ''}>
							{/*<input type="checkbox" checked={task.isDone} onChange={changeStatus}/>*/}
							<Checkbox checked={task.isDone} onChange={changeStatus} color={'primary'}/>

							<EditableSpan title={task.title} onChangeInTitleTask={changeValueHandler}/>
							<IconButton onClick={removeTaskHandler} color={'primary'}><Delete/></IconButton>
						</li>

					})
				}
			</ul>
			<div>
				<Button onClick={onCLickAllFilterHandler} color={'primary'}
								variant={props.filter === 'all' ? 'contained' : 'text'}>All</Button>
				<Button onClick={onCLickActiveFilterHandler} color={'primary'}
								variant={props.filter === 'active' ? 'contained' : 'text'}>Active
				</Button>
				<Button onClick={onCLickCompletedFilterHandler} color={'primary'}
								variant={props.filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
			</div>
		</div>
	)
}

