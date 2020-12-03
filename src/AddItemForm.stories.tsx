import React from 'react';
import AddItemForm, {AddItemFormPropsType} from './AddItemForm';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';

export default {
	title: 'AddItemForm/Component',
	component: AddItemForm,
	argTypes: {
		addItem: {
			description: 'Add item after push button'
		}
	}
} as Meta;

// import {action} from '@storybook/addon-actions';
// const callback = action('action from AddItemForm')
// export const AddItemFormBaseExample = (props: any) => {
// 	return <AddItemForm addItem={ callback }/>
// }

const Template: Story<AddItemFormPropsType> = (args) =>  <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
	addItem: action('action from AddItemForm')
};