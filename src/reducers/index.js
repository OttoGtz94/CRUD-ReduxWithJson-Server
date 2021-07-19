import { combineReducers } from 'redux';
import productosReducer from './productos.reducer';
import alertaReducer from './alerta.reducer';

export default combineReducers({
	productos: productosReducer,
	alerta: alertaReducer,
});
