import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';


const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))




// @ts-ignore
window.store = store;