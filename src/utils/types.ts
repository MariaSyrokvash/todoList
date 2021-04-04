import { store} from '../app/store'
import {FieldErrorType} from '../api/types';
import {rootReducer} from '../app/reducers';



// redux common types
export type rootReducerType = typeof rootReducer
// определить автоматически тип всего объекта состояния
export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch
export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}
