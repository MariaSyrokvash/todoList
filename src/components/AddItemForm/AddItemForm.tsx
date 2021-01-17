import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

export type AddItemFormPropsType = {
	addItem: (title: string) => void
	disabled?: boolean
}

const AddItemForm = React.memo(function ({disabled = false, addItem}: AddItemFormPropsType) {
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
			addItem(newTaskTitle.trim());
			setTitle('');
		} else {
			setError('This field is required')
		}
	}

	return (
		<div>
			<TextField variant={'outlined'} id="outlined-basic" label="Enter your task.."
								 value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
								 error={!!error}
								 helperText={error}
								 disabled={disabled}
			/>
			<IconButton onClick={onCLickAddTaskHandler} color={'primary'} disabled={disabled}>
				<AddCircleOutlineSharpIcon />
			</IconButton>
		</div>
	)
})


export default AddItemForm