import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

export type AddItemFormPropsType = {
	addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	const [newTaskTitle, setTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}
		if (event.key === 'Enter') {
			onCLickAddTaskHandler();
		}
	}

	const onCLickAddTaskHandler = () => {
		if (newTaskTitle.trim() !== '') {
			props.addItem(newTaskTitle.trim());
			setTitle('');
		} else {
			setError('This field is required')
		}
	}

	return (
		<div>
			{/*<input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}*/}
			{/*			 className={error ? 'input-error' : ''}/>*/}
			<TextField variant={'outlined'} id="outlined-basic" label="Enter your task.."
								 value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
								 error={!!error}
								 helperText={error}
			/>
			<IconButton onClick={onCLickAddTaskHandler} color={'primary'}> <AddCircleOutlineSharpIcon/> </IconButton>
			{/*{error && <div className='error-message'>{error}</div>}*/}
		</div>
	)
})


export default AddItemForm