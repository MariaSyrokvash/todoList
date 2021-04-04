import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {rootReducer} from './reducers';


// export type rootReducerType = typeof rootReducer
// export type AppRootState = ReturnType<typeof rootReducer>
// export type AppDispatchType = typeof store.dispatch
// export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}
// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger)
})

// @ts-ignore
window.store = store;


if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./reducers', () => {
		store.replaceReducer(rootReducer)
	})
}
