import React from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {
	title: 'Task/Component',
	component: Task
}

const changeTaskTitleCallback = action('changed title task')
const removeTaskCallback = action('task remove')
const changeStatusCallback = action('changed status task')

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{id: '1', isDone: false, title: 'React'}}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			changeStatus={changeStatusCallback}
			todoListID={'todoListID_1'}
		/>
		<Task
			task={{id: '2', isDone: true, title: 'Redux'}}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			changeStatus={changeStatusCallback}
			todoListID={'todoListID_2'}
		/>
	</>
}