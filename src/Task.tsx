import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';

type TaskPropsType = {
	changeTaskTitle: (id: string, newTitle: string, toDoListID: string) => void
	removeTask: (id: string, toDoListID: string) => void
	changeStatus: (id: string, isDone: boolean, toDoListID: string) => void
	task: TaskType
	todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {

	const removeTaskHandler = () => {
		props.removeTask(props.task.id, props.todoListID)
	}
	const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
		props.changeStatus(props.task.id, event.currentTarget.checked, props.todoListID)
	}

	const changeValueHandler = useCallback((newValue: string) => {
		props.changeTaskTitle(props.task.id, newValue, props.todoListID)
	}, [props.changeTaskTitle, props.task.id, props.todoListID])

	return <li key={props.task.id} className={props.task.isDone ? 'completed' : ''}>
		<Checkbox checked={props.task.isDone} onChange={changeStatus} color={'primary'}/>

		<EditableSpan title={props.task.title} onChangeInTitleTask={changeValueHandler}/>
		<IconButton onClick={removeTaskHandler} color={'primary'}><Delete/></IconButton>
	</li>

})