import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {AppRootState, useActions, useAppDispatch} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {selectIsLoggedIn} from './selectors';
import {authActions} from './index';

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}

type FormValuesType = {
	email: string
	password: string
	rememberMe: boolean
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const {authTC} = useActions(authActions)
	const isLoggedIn = useSelector<AppRootState, boolean>(selectIsLoggedIn)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Email is required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Password is required';
			} else if (values.password.length < 3) {
				errors.email = 'Password more than 3 symbols'
			}
			return errors;
		},

		onSubmit: async (values, formikHelpers) => {
			const result = await dispatch(authTC(values))
			if (authTC.rejected.match(result)) {
				if (result.payload?.fieldsErrors?.length) {
					const error = result.payload?.fieldsErrors[0]
					formikHelpers.setFieldError(error.field, error.error)
				}
			}
			formik.resetForm()
		},
	});

	if (isLoggedIn) {
		return <Redirect to={'/'}/>
	}

	return <Grid container justify="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>To log in get registered
							<a href={'https://social-network.samuraijs.com/'}
								 target={'_blank'}>here
							</a>
						</p>
						<p>or use common test account credentials:</p>
						<p>Email: free@samuraijs.com</p>
						<p>Password: free</p>
					</FormLabel>
					<FormGroup>
						<TextField
							label="Email"
							margin="normal"
							onBlur={formik.handleBlur}
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email ?
							<div style={{color: 'red'}}>{formik.errors.email}</div> : null}
						<TextField
							type="password"
							label="Password"
							margin="normal"
							onBlur={formik.handleBlur}
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password ?
							<div style={{color: 'red'}}>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox
								{...formik.getFieldProps('rememberMe')}
								checked={formik.values.rememberMe}
							/>}
						/>
						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}
