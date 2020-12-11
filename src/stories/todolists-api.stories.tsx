import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists_api';

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': '0e95a4fa-922c-4e5c-96fa-c712f53359b8'
	}
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null);
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		todolistsAPI.getTodolists()
			.then(response => {
				setState(response.data)
			})
	}, [])

	const getToDO = () => {
		todolistsAPI.getTodolists()
			.then(response => {
				setState(response.data)
			})
	}
	return (
		<div>
			{JSON.stringify(state)}

			<div>
				<input value={value} onChange={(event) => {
					setValue(event.currentTarget.value)
				}}/>
				<button onClick={getToDO}>get TODOLIST</button>
			</div>

		</div>
	)
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null);
	const [title, setTitle] = useState<string>('');

	// useEffect(() => {
	// 	todolistsAPI.createTodolist('React-2021')
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	// }, [])

	const createToDO = () => {
		todolistsAPI.createTodolist(title)
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}

		<input placeholder={'Enter title of new todolist'} value={title} onChange={(event) => {
			setTitle(event.currentTarget.value)
		}}/>
		<button onClick={createToDO}>ADD TODOLIST</button>
	</div>
}


export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [todoListID, setTodolist] = useState<string>('')

	// const todolistId = '4b3eccf2-50ee-48d6-be8e-325790879fa5';

	// useEffect(() => {
	// 	todolistsAPI.deleteTodolist(todolistId)
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	// }, [])

	const deleteTodo = () => {
		todolistsAPI.deleteTodolist(todoListID)
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todoListID} onChange={(event) => {
				setTodolist(event.currentTarget.value)
			}}/>
			<button onClick={deleteTodo}>delete todolist</button>
		</div>
	</div>
}


export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	const [todoListID, setTodolist] = useState<string>('')
	const [title, setTitle] = useState<string>('')

	// useEffect(() => {
	// 	const todolistId = 'aa37e143-a153-42dc-a915-ba4746ce3933';
	// 	todolistsAPI.updateTodolistTitle(todolistId, 'It is friday')
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	//
	// }, [])

	const updateTodo = () => {
		todolistsAPI.updateTodolistTitle(todoListID, title)
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'enter todolistId'} value={todoListID} onChange={(event) => {
				setTodolist(event.currentTarget.value)
			}}/>
			<input placeholder={'enter title'} value={title} onChange={(event) => {
				setTitle(event.currentTarget.value)
			}}/>
			<button onClick={updateTodo}>update todolist title</button>
		</div>

	</div>
}


export const GetTasks = () => {
	const [state, setState] = useState<any>(null);
	const [todoListID, setTodolist] = useState<string>('')

	// useEffect(() => {
	// 	todolistsAPI.getTasks(todoListID)
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	// }, [])

	const getTasks = () => {
		todolistsAPI.getTasks(todoListID)
			.then(response => {
				setState(response.data)
			})
	}
	return <div> {JSON.stringify(state)}
	<input value={todoListID} placeholder={'todoListID'} onChange={(event) => {setTodolist(event.currentTarget.value)}} />
	<button onClick={getTasks}>get tasks</button>
	</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null);
	const [taskId, setTaskId] = useState<string>('');
	const [todolistID, setTodolistID] = useState<string>('');

	// useEffect(() => {
	// 	const todolistID = 'a0f03a39-74db-4936-8111-7c18467b2d1c'
	// 	const taskId = '0c5edba2-f96b-4026-9832-c4661430577c'
	// 	todolistsAPI.deleteTask(todolistID, taskId)
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	// }, [])


	const deleteTask = () => {
		todolistsAPI.deleteTask(todolistID, taskId)
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}
		<div>
			<input placeholder={'todolistID'} value={todolistID} onChange={(event) => {
				setTodolistID(event.currentTarget.value)
			}}/>
			<input placeholder={'taskId'} value={taskId} onChange={(event) => {
				setTaskId(event.currentTarget.value)
			}}/>
			<button onClick={deleteTask}>delete task</button>
		</div>
	</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null);
	const [todoListID, setTodolistID] = useState<string>('')
	const [titleTask, setTitleTask] = useState<string>('')


	// useEffect(() => {
	// 	todolistsAPI.createTask(todoListID, title)
	// 		.then(response => {
	// 			setState(response.data)
	// 		})
	// }, [])

	const createTask = () => {
		todolistsAPI.createTask(todoListID, titleTask)
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}

	<div>
		<input value={todoListID} onChange={(event) => {setTodolistID(event.currentTarget.value)}} placeholder={'todoListID'}/>
		<input value={titleTask} onChange={(event) => {setTitleTask(event.currentTarget.value)}} placeholder={'enter task'}/>
		<button onClick={createTask}>create task</button>
	</div>
	</div>
}


export const UpdateTask = () => {
	const [state, setState] = useState<any>(null);
	const [description, setDescription] = useState<string>('description-1');
	const [title, setTitle] = useState<string>('title-1');
	const [startDate, setStartDate] = useState<string >('');
	const [deadline, setDeadline] = useState<string >('');
	const [taskId, setTaskId] = useState<string>('');
	const [todoListId, setTodoListId] = useState<string>('');
	const [addedDate, setAddedDate] = useState<string>('');
	const [status, setStatus] = useState<number>(0);
	const [priority, setPriority] = useState<number>(0);
	const [order, setOrder] = useState<number>(0);

	const updateTask = () => {
		todolistsAPI.updateTask(todoListId, taskId, {
				title: title,
				description: description,
				status: status,
				priority: priority,
				startDate: '',
				deadline: ''
			})
			.then(response => {
				setState(response.data)
			})
	}

	return <div> {JSON.stringify(state)}

		<div>
			<input value={taskId} onChange={(event) => {setTaskId(event.currentTarget.value)}} placeholder={'taskId'}/>
			<input value={todoListId} onChange={(event) => {setTodoListId(event.currentTarget.value)}} placeholder={'todoListId'}/>
			<input value={description} onChange={(event) => {setDescription(event.currentTarget.value)}} placeholder={'description'}/>
			<input value={title} onChange={(event) => {setTitle(event.currentTarget.value)}} placeholder={'title'}/>
			<input value={startDate} onChange={(event) => {setStartDate(event.currentTarget.value)}} placeholder={'startDate'}/>
			<input value={deadline} onChange={(event) => {setDeadline(event.currentTarget.value)}} placeholder={'deadline'}/>
			<input value={addedDate} onChange={(event) => {setAddedDate(event.currentTarget.value)}} placeholder={'addedDate'}/>
			<input value={status} onChange={(event) => {setStatus(event.currentTarget.valueAsNumber)}} placeholder={'status'}/>
			<input value={priority} onChange={(event) => {setPriority(event.currentTarget.valueAsNumber)}} placeholder={'priority'}/>
			<input value={order} onChange={(event) => {setOrder(event.currentTarget.valueAsNumber)}} placeholder={'order'}/>

			<button onClick={updateTask}>update title task</button>
		</div>
	</div>
}