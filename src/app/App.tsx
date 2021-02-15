import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CircularProgress, Container, LinearProgress} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {TaskType} from '../api/todolists_api';
import {CustomizedSnackbars} from '../components/ErrorSnackBar/ErrorSnackBar';
import {asyncActions} from './app-reducer';
import {Redirect, Route, Switch} from 'react-router-dom';
import {logoutTC} from '../features/Auth/auth-reducer';
import {authSelectors, Login} from '../features/Auth';
import {appSelectors} from './index';
import {TodoLists} from '../features/TodoLists';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TaskStateType = {
	[key: string]: Array<TaskType>
}
type  PropsType = {
	demo?: boolean
}



export const App: React.FC<PropsType> = ({demo = false}) => {
	const status = useSelector(appSelectors.selectStatus)
	const isInitialized = useSelector(appSelectors.selectIsInitialized)
	const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncActions.initializedTC())
	}, [])

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())
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
						<Route path={'/'} exact render={() => <TodoLists demo={demo}/>}/>
						<Route path={'/login'} render={() => <Login/>}/>
						<Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
						<Redirect from={'*'} to={'/404'}/>
					</Switch>

				</Container>
			</div>
		</>

	);
}




