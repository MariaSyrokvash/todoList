import {slice} from './todolists-reducer';
import {asyncActions as todolistsAsyncActions} from './todolists-reducer';
import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import TodoLists from './TodoLists';

const todolistsActions = {
	...todolistsAsyncActions,
	...slice.actions
}

const tasksActions = {
	...tasksAsyncActions,
	...slice.actions
}

export {
	tasksActions,
	todolistsActions,
	TodoLists
}