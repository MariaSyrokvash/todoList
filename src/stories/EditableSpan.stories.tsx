import React from 'react';
import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import {EditableSpan, EditableSpanPropsType} from '../EditableSpan';

export default {
	title: 'Task/Component',
	component: EditableSpan,
	argTypes: {
		value: {
			description: 'span value',
			defaultValue: 'default value'
		}
	}
} as Meta;

const onChangeInTitleTaskCallback = action('changed value')

export const EditableSpanBaseExample = () => {
	return <>
		<EditableSpan title={'start title'} onChangeInTitleTask={onChangeInTitleTaskCallback}/>
	</>
}

//new version
const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;
export const EditableSpanNewVersion = Template.bind({});
EditableSpanNewVersion.args = {
	onChangeInTitleTask: action('EditableSpan want to changed')
}