import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AddItemForm from '../AddItemForm/AddItemForm';
import {TodoList} from '../TodoList/TodoList';
import {AppRootState} from '../../state/store';
import {
	addTodoListTC,
	changeTodolistFilterAC, changeTodolistTitleTC,
	fetchTodoListTC,
	removeTodoListTC,
	TodoListDomainType
} from '../../state/todolists-reducer';
import {FilterValuesType, TaskStateType} from '../../App';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../state/tasks-reducer';
import {TaskStatuses} from '../../api/todolists_api';
import {Redirect} from 'react-router-dom';


type  PropsType = {
	demo?: boolean
}

const TodoLists: React.FC<PropsType> = ({demo = false}) => {

	const dispatch = useDispatch()
	const toDoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists);
	const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);
	const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

	useEffect(() => {
		if (demo || !isLoggedIn) {
			return
		}
		dispatch(fetchTodoListTC())
	}, [])

	const addTask = useCallback((title: string, toDoListID: string) => {
		dispatch(addTaskTC(title, toDoListID))
	}, [dispatch])

	const removeTask = useCallback((id: string, toDoListID: string) => {
		dispatch(removeTaskTC(id, toDoListID))
	}, [dispatch])

	const changeStatus = useCallback((id: string, status: TaskStatuses, toDoListID: string) => {
		dispatch(updateTaskTC(id, {status: status}, toDoListID))
	}, [dispatch])

	const changeTaskTitle = useCallback((id: string, newTitle: string, toDoListID: string) => {
		dispatch(updateTaskTC(id, {title: newTitle}, toDoListID))
	}, [dispatch])


	const changeFilter = useCallback((value: FilterValuesType, toDoListID: string) => {
		dispatch(changeTodolistFilterAC({filter: value, id: toDoListID}))
	}, [dispatch])

	const removeTodoList = useCallback((toDoListID: string) => {
		dispatch(removeTodoListTC(toDoListID))
	}, [dispatch])

	const addNewToDoList = useCallback((title: string) => {
		dispatch(addTodoListTC(title))
	}, [dispatch])

	const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
		dispatch(changeTodolistTitleTC(newTitle, id))
	}, [])



	if (!isLoggedIn) {
		return <Redirect to={'/login'} />
	}

	return (
		<>
			<Grid container style={{padding: '20px'}}>
				<AddItemForm addItem={addNewToDoList}/>
			</Grid>
			<Grid container spacing={10}>
				{
					toDoLists.map(toDoList => {
						let allTaskForTodoList = tasks[toDoList.id];
						let tasksForTodoList = allTaskForTodoList;

						return (
							<Grid item>
								<Paper key={toDoList.id} style={{padding: '13px'}}>

									<TodoList
									todolist={toDoList}
									tasks={tasksForTodoList}
									removeTask={removeTask}
									addTask={addTask}
									changeFilter={changeFilter}
									changeStatus={changeStatus}
									key={toDoList.id}
									removeTodoList={removeTodoList}
									changeTaskTitle={changeTaskTitle}
									changeTodoListTitle={changeTodoListTitle}
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




