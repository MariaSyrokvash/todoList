import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../app/store';
import {setAppError} from '../../app/app-reducer';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbars() {
	// const [open, setOpen] = React.useState(false);
	const error = useSelector<AppRootState, string | null>((state) => state.app.error)
	const dispatch = useDispatch()

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
			dispatch(setAppError({error: null}))
	};



	const isOpen = error !== null

	return (
		<Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				{error}
			</Alert>
		</Snackbar>
	);
}