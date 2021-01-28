import {appReducer, initialAppStateType, setAppError, setAppStatus} from './app-reducer';


let startState: initialAppStateType

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle',
		isInitialized: false
	};
})

test('correct error-message  should be set', () => {
	const action = setAppError({error: 'some error'});
	const endState = appReducer(startState, action);

	expect(endState.error).toBe('some error');
});

test('correct status  should be set', () => {
	const action = setAppStatus({status: 'loading'});
	const endState = appReducer(startState, action);

	expect(endState.status).toBe('loading');
});