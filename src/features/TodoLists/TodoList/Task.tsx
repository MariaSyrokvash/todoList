import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {tasksActions} from '../index';
import {useActions} from '../../../utils/redux-utils';
import {TaskStatuses, TaskType} from '../../../api/types';

export type TaskPropsType = {
	task: TaskType
	todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {
	const {removeTask, updateTask} = useActions(tasksActions)

	const removeTaskHandler = () => {
		debugger
		console.log(props.todoListID)
		console.log(props.task)
		removeTask({taskId: props.task.id, todolistId: props.todoListID})
	}
	const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
		const newIsDoneValue = event.currentTarget.checked
		updateTask({
			taskID: props.task.id,
			domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
			toDoListID: props.todoListID
		})
	}

	const changeValueHandler = useCallback((newValue: string) => {
		updateTask({
			taskID: props.task.id,
			domainModel: {title: newValue},
			toDoListID: props.todoListID
		})
	}, [props.task.id, props.todoListID])


	return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'completed' : ''}>
		<Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={changeStatus} color={'primary'}/>

		<EditableSpan title={props.task.title} onChangeInTitleTask={changeValueHandler}/>
		<IconButton onClick={removeTaskHandler} color={'primary'}><Delete/></IconButton>
	</li>

})