import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; /* Permite utilizar funciones asincronas */
import reducer from './reducers';

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		typeof window === 'object' &&
			typeof window.__REDUX_DEVTOOLS_EXTENSION__ !==
				'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
	/* applyMiddleware se requiere porque se usa thunk */
	/* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() es para utilizar la herramienta de redux devtools, revisa si tenemos redux-developer-tools como extension agrega ciertas funcionalidades */
);

export default store;
