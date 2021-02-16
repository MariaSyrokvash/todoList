import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import {AppRootState} from '../../utils/types';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../../features/CommonActions/CommonActions';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbars() {
	const error = useSelector<AppRootState, string | null>((state) => state.app.error)
	const {setAppError} = useActions(appActions)
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setAppError({error: null})
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