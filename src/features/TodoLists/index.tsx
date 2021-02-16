import {slice as todolistsSlice} from './todolists-reducer';
import {slice as tasksSlice} from './tasks-reducer';
import {asyncActions as todolistsAsyncActions} from './todolists-reducer';
import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import TodoLists from './TodoLists';

const todolistsActions = {
	...todolistsAsyncActions,
	...todolistsSlice.actions
}

const tasksActions = {
	...tasksAsyncActions,
	...tasksSlice.actions
}

const tasksReducer = tasksSlice.reducer
const todolistsReducer = todolistsSlice.reducer

export {
	tasksActions,
	todolistsActions,
	todolistsReducer,
	tasksReducer,
	TodoLists
}