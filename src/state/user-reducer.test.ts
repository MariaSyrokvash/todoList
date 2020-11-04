import {userReducer} from './user-reducer';


test('user reducer should increment only age', () => {
	const startState = { age: 26, childrenCount: 0, name: 'Mariya' };

	const endState = userReducer(startState, {type: 'INCREMENT_AGE'})

	expect(endState.age).toBe(27);
	expect(endState.childrenCount).toBe(0);
})


test('user reducer should increment only childrenCount', () => {
	const startState = { age: 26, childrenCount: 0, name: 'Mariya' };

	const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'})

	expect(endState.age).toBe(26);
	expect(endState.childrenCount).toBe(1);
});


test('user reducer should change name of user', () => {
	const startState = { name: 'Dimych', age: 20, childrenCount: 2 };
	const newName = 'Mariya';
	const endState = userReducer(startState, { type: 'CHANGE_NAME', newName: newName })

	expect(endState.name).toBe(newName);
});
