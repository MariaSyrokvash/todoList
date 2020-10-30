import React, {ChangeEvent, useState} from 'react';
import {log} from 'util';

type EditableSpanPropsType = {
	title: string
	onChangeInTitleTask: (newValue: string) => void
}
export default function EditableSpan(props: EditableSpanPropsType) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');

	const activateChangeMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}

	const disableChangeMode = () => {
		setEditMode(false)
		props.onChangeInTitleTask(title)
	}

	const changeTitleIfEditModeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const newEditableTitle = event.target.value;
		setTitle(newEditableTitle)
	}

	return (
		editMode ?
			<input value={title} onChange={ changeTitleIfEditModeHandler } onBlur={ disableChangeMode } autoFocus/>
			:
			<span onDoubleClick={activateChangeMode}>{props.title}</span>
	)
}