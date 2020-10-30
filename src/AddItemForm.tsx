import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
	const [newTaskTitle, setTitle] = useState('');
	const [error, setError] = useState<string | null>(null);
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}
	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null);

		if (newTaskTitle.trim() !== '') {
			if (event.key === 'Enter') {
				props.addItem(newTaskTitle);
				setTitle('');
			}
		} else {
			setError('This field is required')
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
			<input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
						 className={error ? 'input-error' : ''}/>
			<button onClick={onCLickAddTaskHandler}>+</button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	)
}


export default AddItemForm