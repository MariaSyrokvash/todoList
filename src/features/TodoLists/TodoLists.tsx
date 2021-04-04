import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {useSelector} from 'react-redux';
import AddItemForm, {AddItemFormHelpersType} from '../../components/AddItemForm/AddItemForm';
import {TodoList} from './TodoList/TodoList';
import {TaskStateType} from '../../app/App';
import {Redirect} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todolistsActions} from './index';
import {useActions, useAppDispatch} from '../../utils/redux-utils';
import {AppRootState} from '../../utils/types';
import {TodolistDomainType} from './todolists-reducer';


type  PropsType = {
	demo?: boolean
}

const TodoLists: React.FC<PropsType> = ({demo = false}) => {
	const toDoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists);
	const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);
	const isLoggedIn = useSelector<AppRootState, boolean>(selectIsLoggedIn)
	const {fetchTodoList} = useActions(todolistsActions)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (demo || !isLoggedIn) {
			return
		}
		if (!toDoLists.length) {
			fetchTodoList()
		}
	}, [])

	const addTodoListHandler = useCallback(async (title: string, helper: AddItemFormHelpersType) => {
		const thunk = todolistsActions.addTodoList(title)
		const resultAction = await dispatch(thunk)

		if (todolistsActions.addTodoList.rejected.match(resultAction)) {
			if (resultAction.payload?.errors?.length) {
				const errorMessage = resultAction.payload?.errors[0]
				helper.setError(errorMessage)
			} else {
				helper.setError('Some error occurred')
			}
		} else {
			helper.setTitle('')
		}
	}, [])

	if (!isLoggedIn) {
		return <Redirect to={'/login'}/>
	}

	return (
		<>
			<Grid container style={{padding: '20px'}}>
				<AddItemForm addItem={addTodoListHandler}/>
			</Grid>
			<Grid container spacing={10}>
				{
					toDoLists.map((toDoList, index) => {
						let allTaskForTodoList = tasks[toDoList.id];
						let tasksForTodoList = allTaskForTodoList;

						return (
							<Grid item key={index}>
								<Paper key={toDoList.id} style={{margin: '10px', width: '280px', padding: '10px'}}>
									<TodoList
										todolist={toDoList}
										tasks={tasksForTodoList}
										key={toDoList.id}
										demo={demo}
									/>
								</Paper>
							</Grid>
						)
					})
				}
			</Grid>
		</>

	);
}

export default TodoLists;




