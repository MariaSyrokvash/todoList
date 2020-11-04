type StateType = {
	name: string
	age: number
	childrenCount: number
}

type ActionType = {
	type: string
	[key: string]: any

}


export const userReducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case 'INCREMENT_AGE':
			const copyState = {...state}
			copyState.age = state.age + 1;
			return copyState;
		case 'INCREMENT_CHILDREN_COUNT':
			return {...state, childrenCount: state.childrenCount + 1};
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.newName
			}
		default:
			throw new Error('I don\'t understand this type')
	}
}