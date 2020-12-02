import React from 'react';
import AddItemForm from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
	title: 'AddItemForm/Component',
	component: AddItemForm
}

const callback = action('action from AddItemForm')

export const AddItemFormBaseExample = (props: any) => {
	return <AddItemForm addItem={ callback }/>
}