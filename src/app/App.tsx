import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CircularProgress, Container, LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {CustomizedSnackbars} from '../components/ErrorSnackBar/ErrorSnackBar';
import {appActions, appSelectors} from '../features/Application';
import {Redirect, Route, Switch} from 'react-router-dom';
import {authActions, authSelectors, Login} from '../features/Auth';
import {TodoLists} from '../features/TodoLists';
import {TaskType} from '../api/types';
import {useActions} from '../utils/redux-utils';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
}

export const App = () => {
	const status = useSelector(appSelectors.selectStatus)
	const isInitialized = useSelector(appSelectors.selectIsInitialized)
	const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
	const {logout} = useActions(authActions)
	const {initializedApp} = useActions(appActions)

	useEffect(() => {
		if (!isInitialized) {
			initializedApp()
		}
	}, [])

	const logoutHandler = useCallback(() => {
		logout()
	}, [])

	if (!isInitialized) {
		return <div className='circularProgressBox'><CircularProgress color="secondary"/></div>
	}

	return (
		<>
			<div className="App">
				<CustomizedSnackbars/>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6"></Typography>
						{isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
					</Toolbar>
				</AppBar>

				{status === 'loading' && <LinearProgress/>}

				<Container fixed>

					<Switch>
						<Route path={'/todoList'} exact render={() => <Redirect to={'/'}/>}/>
						<Route path={'/'} exact render={() => <TodoLists demo={false}/>}/>
						<Route path={'/login'} render={() => <Login/>}/>
						<Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
						<Redirect from={'*'} to={'/404'}/>
					</Switch>

				</Container>
			</div>
		</>

	);
}




