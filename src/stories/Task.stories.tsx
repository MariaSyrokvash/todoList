import React from 'react';
import {Task, TaskPropsType} from '../features/TodoLists/TodoList/Task';
import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../api/types';


export default {
	title: 'Task/Component',
	component: Task,
	decorators: [ReduxStoreProviderDecorator]
} as Meta

const changeTaskTitleCallback = action('changed title task')
const removeTaskCallback = action('task remove')
const changeStatusCallback = action('changed status task')

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{
				id: '1', status: TaskStatuses.New, title: 'React', todoListId: 'toDoListsFirst',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
			}}
			todoListID={'todoListID_1'}
		/>
		<Task
			task={{
				id: '2', title: 'Css', status: TaskStatuses.Completed, todoListId: 'toDoListsFirst',
				startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
			}}
			todoListID={'todoListID_2'}
		/>
	</>
}

//более новый подход
const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExampleNewVersion = Template.bind({});
TaskIsDoneExampleNewVersion.args = {
	task: {
		id: '1',
		title: 'CSS',
		todoListId: 'toDoListsFirst',
		status: TaskStatuses.Completed,
		startDate: '',
		deadline: '',
		addedDate: '',
		order: 0,
		priority: TaskPriorities.Low,
		description: ''
	},
	todoListID: 'todoListID121'
}

export const TaskIsNotDoneExampleNewVersion = Template.bind({});
TaskIsNotDoneExampleNewVersion.args = {
	task: {
		id: '1',
		title: 'CSS',
		todoListId: 'toDoListsFirst',
		status: TaskStatuses.New,
		startDate: '',
		deadline: '',
		addedDate: '',
		order: 0,
		priority: TaskPriorities.Low,
		description: ''
	},
	todoListID: 'todoListID11'
}