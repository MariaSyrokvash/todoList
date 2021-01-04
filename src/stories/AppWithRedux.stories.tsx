import React from 'react';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {Meta, Story} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';



export default {
	title: 'AppWithRedux/Component',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator]
} as Meta;


export const AppWithReduxBaseExample = () => {
	return <>
		<AppWithRedux demo={true}/>
	</>
}

//new version
const Template: Story = (args) =>  <AppWithRedux />
export const AppWithReduxBaseExampleNewVersion = Template.bind({});
AppWithReduxBaseExampleNewVersion.args = {

}