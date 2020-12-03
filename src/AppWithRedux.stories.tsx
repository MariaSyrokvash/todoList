import React from 'react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';
import {Meta, Story} from '@storybook/react';
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';
import {action} from '@storybook/addon-actions';
import {Provider} from 'react-redux';
import {store} from './state/store';


export default {
	title: 'AppWithRedux/Component',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator]
} as Meta;


export const AppWithReduxBaseExample = () => {
	return <>
		<AppWithRedux/>
	</>
}

//new version
const Template: Story = (args) =>  <AppWithRedux />
export const AppWithReduxBaseExampleNewVersion = Template.bind({});
AppWithReduxBaseExampleNewVersion.args = {

}