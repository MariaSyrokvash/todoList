import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../AddItemForm/AddItemForm';
import {Button, IconButton, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Task} from '../../Task';
import {TaskStatuses, TaskType} from '../../api/todolists_api';
import {FilterValuesType, TodoListDomainType} from '../../state/todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasks} from '../../state/tasks-reducer';

type PropsType = {
	todolist: TodoListDomainType
	tasks: Array<TaskType>
	addTask: (title: string, toDoListID: string) => void
	changeFilter: (value: FilterValuesType, id: string) => void
	removeTodoList: (toDoListID: string) => void
	changeTaskTitle: (id: string, newTitle: string, toDoListID: string) => void
	removeTask: (id: string, toDoListID: string) => void
	changeStatus: (id: string, status: TaskStatuses, toDoListID: string) => void
	changeTodoListTitle: (id: string, newTitle: string) => void
	demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {

	const dispatch = useDispatch()

	useEffect(() => {
		if (demo) {
			return;
		}

		dispatch(fetchTasks(props.todolist.id))
	}, [])

	const onCLickAllFilterHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
	const onCLickActiveFilterHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
	const onCLickCompletedFilterHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])
	const removeTodoList = () => props.removeTodoList(props.todolist.id)

	const addTask = useCallback((title: string) => {
		props.addTask(title, props.todolist.id)
	}, [props.addTask, props.todolist.id])

	const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(props.todolist.id, newTitle), [props.changeTodoListTitle, props.todolist.id])

	let tasksForTodoList = props.tasks

	if (props.todolist.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
	}

	if (props.todolist.filter === 'active') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
	}

	return (
		<div>
			<div>
				<div className={'box'}>
					<Typography variant={'h5'}>
						<EditableSpan title={props.todolist.title} onChangeInTitleTask={changeTodoListTitle}/>
						<IconButton onClick={removeTodoList} color={'primary'} disabled={props.todolist.entityStatus === 'loading'}>
							<Delete/>
						</IconButton>
					</Typography>
				</div>
				<AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
			</div>
			<ul>
				{
					tasksForTodoList.map(task => {
						return <Task
							todoListID={props.todolist.id}
							task={task}
							changeTaskTitle={props.changeTaskTitle}
							removeTask={props.removeTask}
							changeStatus={props.changeStatus}
							key={task.id}
						/>
					})
				}
			</ul>
			<div>
				<Button onClick={onCLickAllFilterHandler} color={'primary'}
								variant={props.todolist.filter === 'all' ? 'contained' : 'text'}>All</Button>
				<Button onClick={onCLickActiveFilterHandler} color={'primary'}
								variant={props.todolist.filter === 'active' ? 'contained' : 'text'}>Active
				</Button>
				<Button onClick={onCLickCompletedFilterHandler} color={'primary'}
								variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
			</div>
		</div>
	)
})

