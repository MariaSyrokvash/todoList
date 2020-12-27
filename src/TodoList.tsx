import React, {useCallback, useEffect} from 'react';
import AddItemForm from './AddItemForm';
import {Button, IconButton, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './api/todolists_api';
import { FilterValuesType} from './state/todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasks} from './state/tasks-reducer';

type PropsType = {
	id: string
	filter: FilterValuesType
	title: string
	tasks: Array<TaskType>
	addTask: (title: string, toDoListID: string) => void
	changeFilter: (value: FilterValuesType, id: string) => void
	removeTodoList: (toDoListID: string) => void
	changeTaskTitle: (id: string, newTitle: string, toDoListID: string) => void
	removeTask: (id: string, toDoListID: string) => void
	changeStatus: (id: string, status: TaskStatuses, toDoListID: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
	console.log('TodoList is rendered')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTasks(props.id))
	}, [])

	const onCLickAllFilterHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
	const onCLickActiveFilterHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
	const onCLickCompletedFilterHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
	const removeTodoList = () => props.removeTodoList(props.id)

	const addTask = useCallback((title: string) => {
		props.addTask(title, props.id)
	}, [props.addTask, props.id])

	const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(props.id, newTitle), [props.changeTodoListTitle, props.id])

	let tasksForTodoList = props.tasks

	if (props.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
	}

	if (props.filter === 'active') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
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
					tasksForTodoList.map(task => {
						return <Task
							task={task}
							changeTaskTitle={props.changeTaskTitle}
							removeTask={props.removeTask}
							changeStatus={props.changeStatus}
							todoListID={props.id}
							key={task.id}
						/>
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
})

