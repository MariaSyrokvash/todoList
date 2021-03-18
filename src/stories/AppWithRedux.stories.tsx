import React from 'react';
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {Meta, Story} from '@storybook/react';
import {App} from '../app/App';


export default {
	title: 'App/Component',
	component: App,
	// decorators: [ReduxStoreProviderDecorator, StoryRouter()]
	decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as Meta;


export const AppWithReduxBaseExample = () => {
	return <>
		<App demo={true}/>
	</>
}

//new version
const Template: Story = (args) =>  <App />
export const AppWithReduxBaseExampleNewVersion = Template.bind({});
AppWithReduxBaseExampleNewVersion.args = {

}