import {appReducer, InitialStateType, setAppError, setAppStatus} from './app-reducer';


let startState: InitialStateType

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle'
	};
})

test('correct error-message  should be set', () => {
	const action = setAppError('some error');
	const endState = appReducer(startState, action);

	expect(endState.error).toBe('some error');
});

test('correct status  should be set', () => {
	const action = setAppStatus('loading');
	const endState = appReducer(startState, action);

	expect(endState.status).toBe('loading');
});