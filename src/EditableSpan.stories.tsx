import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
	title: 'Task/Component',
	component: EditableSpan
}

const onChangeInTitleTaskCallback = action('changed value')

export const EditableSpanBaseExample = () => {
	return <>
		<EditableSpan title={'start title'} onChangeInTitleTask={onChangeInTitleTaskCallback}/>
	</>
}