import {combineReducers} from 'redux';
import {tasksReducer, todolistsReducer} from '../features/TodoLists';
import {appReducer} from '../features/Application';
import {authReducer} from '../features/Auth';


export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer
})
