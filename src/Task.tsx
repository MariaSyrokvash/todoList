import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {EditableSpan} from './components/EditableSpan/EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from './api/todolists_api';

export type TaskPropsType = {
	changeTaskTitle: (id: string, newTitle: string, toDoListID: string) => void
	removeTask: (id: string, toDoListID: string) => void
	changeStatus: (id: string, status: TaskStatuses, toDoListID: string) => void
	task: TaskType
	todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {

	const removeTaskHandler = () => {
		props.removeTask(props.task.id, props.todoListID)
	}
	const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
		const newIsDoneValue  = event.currentTarget.checked
		props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID)
	}

	const changeValueHandler = useCallback((newValue: string) => {
		props.changeTaskTitle(props.task.id, newValue, props.todoListID)
	}, [props.changeTaskTitle, props.task.id, props.todoListID])

	return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'completed' : ''}>
		<Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={changeStatus} color={'primary'}/>

		<EditableSpan title={props.task.title} onChangeInTitleTask={changeValueHandler}/>
		<IconButton onClick={removeTaskHandler} color={'primary'}><Delete/></IconButton>
	</li>

})