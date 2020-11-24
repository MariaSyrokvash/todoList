import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton, Typography} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from './state/tasks-reducer';
import {FilterValuesType, TaskType} from './AppWithRedux';

type PropsType = {
	id: string
	filter: FilterValuesType
	title: string
	changeFilter: (value: FilterValuesType, id: string) => void
	removeTodoList: (toDoListID: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.id] );
	console.log(tasks)


	const onCLickAllFilterHandler = () => props.changeFilter('all', props.id)
	const onCLickActiveFilterHandler = () => props.changeFilter('active', props.id)
	const onCLickCompletedFilterHandler = () => props.changeFilter('completed', props.id)
	const removeTodoList = () => props.removeTodoList(props.id)
	const changeTodoListTitle = (newTitle: string) => {
		props.changeTodoListTitle(props.id, newTitle)
	}

	let allTodoListTasks = tasks
	let tasksForTodoList = allTodoListTasks


	if (props.filter === 'completed') {
		tasksForTodoList = allTodoListTasks.filter(task => task.isDone === true)
	}

	if (props.filter === 'active') {
		tasksForTodoList = allTodoListTasks.filter(task => task.isDone === false)
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
				<AddItemForm addItem={ (title: string) => {
					const action = addTaskAC(title, props.id)
					dispatch(action)
				} }/>
			</div>
			<ul>
				{
					tasksForTodoList.map(task => {
						const removeTaskHandler = () => {
							const action = removeTaskAC(task.id, props.id)
							dispatch(action)
						}
						const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							const action = changeStatusTaskAC(task.id, event.currentTarget.checked, props.id);
							dispatch(action)
						}

						const changeValueHandler = (newValue: string) => {
							const action = changeTitleTaskAC(task.id, newValue, props.id);
							dispatch(action)
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

