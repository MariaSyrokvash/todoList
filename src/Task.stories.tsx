import React from 'react';
import {Task, TaskPropsType} from './Task';
import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import {TaskStatuses, TodoTaskPriories} from './api/todolists_api';


export default {
	title: 'Task/Component',
	component: Task
} as Meta

const changeTaskTitleCallback = action('changed title task')
const removeTaskCallback = action('task remove')
const changeStatusCallback = action('changed status task')

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{
				id: '1', status: TaskStatuses.New, title: 'React', todoListId: 'toDoListsFirst',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			changeStatus={changeStatusCallback}
			todoListID={'todoListID_1'}
		/>
		<Task
			task={{
				id: '2', title: 'Css',  status: TaskStatuses.Completed, todoListId: 'toDoListsFirst',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''
			}}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			changeStatus={changeStatusCallback}
			todoListID={'todoListID_2'}
		/>
	</>
}

//более новый подход
const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExampleNewVersion = Template.bind({});
TaskIsDoneExampleNewVersion.args = {
	changeTaskTitle: changeTaskTitleCallback,
	removeTask: removeTaskCallback,
	changeStatus: changeStatusCallback,
	task: {id: '1', title: 'CSS', todoListId: 'toDoListsFirst', status: TaskStatuses.Completed, startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''},
	todoListID: 'todoListID121'
}

export const TaskIsNotDoneExampleNewVersion = Template.bind({});
TaskIsNotDoneExampleNewVersion.args = {
	changeTaskTitle: changeTaskTitleCallback,
	removeTask: removeTaskCallback,
	changeStatus: changeStatusCallback,
	task: {id: '1', title: 'CSS', todoListId: 'toDoListsFirst', status: TaskStatuses.New, startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriories.Low, description: ''},
	todoListID: 'todoListID11'
}