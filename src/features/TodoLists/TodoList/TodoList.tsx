import React, {useCallback, useEffect} from 'react';
import AddItemForm, {AddItemFormHelpersType} from '../../../components/AddItemForm/AddItemForm';
import {Button, IconButton, PropTypes, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Task} from './Task';
import {TaskStatuses, TaskType} from '../../../api/todolists_api';
import {TodoListDomainType} from '../todolists-reducer';
import {useActions, useAppDispatch} from '../../../app/store';
import {tasksActions, todolistsActions} from '../index';
import {FilterValuesType} from '../../../app/App';
import {useDispatch} from 'react-redux';

type PropsType = {
	todolist: TodoListDomainType
	tasks: Array<TaskType>
	demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {
	const {changeTodolistFilter, removeTodoList, changeTodolistTitle} = useActions(todolistsActions)
	const {fetchTasks} = useActions(tasksActions)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (demo) {
			return
		}
		fetchTasks(props.todolist.id)
	}, [])

	const onButtonClickFilterHandler = useCallback((filter: FilterValuesType) => changeTodolistFilter({
		filter: filter,
		id: props.todolist.id
	}), [props.todolist.id])

	const removeTodoListHandler = () => removeTodoList(props.todolist.id)

	const addTaskHandler = useCallback(async (title: string, helper: AddItemFormHelpersType) => {
		const thunk = tasksActions.addTask({title: title, toDoListID: props.todolist.id})
		const resultAction = await dispatch(thunk)

		if (tasksActions.addTask.rejected.match(resultAction)) {
			if (resultAction.payload?.errors?.length) {
				const errorMessage = resultAction.payload?.errors[0]
				helper.setError(errorMessage)
			} else {
				helper.setError('Some error occurred')
			}
		} else {
			helper.setTitle('')
		}
	}, [props.todolist.id])

	const changeTodoListTitle = useCallback((newTitle: string) => changeTodolistTitle({
		id: props.todolist.id,
		title: newTitle
	}), [props.todolist.id])

	let tasksForTodoList = props.tasks

	if (props.todolist.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
	}

	if (props.todolist.filter === 'active') {
		tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
	}


	const renderFilterButton = (
		buttonFilter: FilterValuesType,
		color: PropTypes.Color,
		text: string
	) => {
		return <Button onClick={() => onButtonClickFilterHandler(buttonFilter)} color={color}
									 variant={props.todolist.filter === buttonFilter ? 'contained' : 'text'}>{text}</Button>
	}

	return (
		<div>
			<div style={{position: 'relative'}}>
				<IconButton onClick={removeTodoListHandler} color={'primary'}
										disabled={props.todolist.entityStatus === 'loading'} style={{position: 'absolute', right: 0}}>
					<Delete/>
				</IconButton>
				<div className={'box'}>
					<Typography variant={'h5'}>
						<EditableSpan title={props.todolist.title} onChangeInTitleTask={changeTodoListTitle}/>
					</Typography>
				</div>
				<AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
			</div>
			<ul>
				{
					tasksForTodoList.map(task => {
						return <Task
							todoListID={props.todolist.id}
							task={task}
							key={task.id}
						/>
					})
				}
				{!tasksForTodoList.length && <span>Create your first task</span>}
			</ul>
			<div>
				{renderFilterButton('all', 'primary', 'All')}
				{renderFilterButton('active', 'default', 'Active')}
				{renderFilterButton('completed', 'secondary', 'Completed')}
			</div>
		</div>
	)
})
