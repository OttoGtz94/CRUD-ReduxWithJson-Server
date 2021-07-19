import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* useDispatch sirve para ejecutar los actions que tengamos y useSelector es una forma de acceder al state dentro del componente */
/* useSelector es el hook de redux para leer lo que tengamos en el state */
/* actions de redux */
import { crearNuevoProductoAction } from '../actions/producto.actions';
import {
	mostrarAlerta,
	ocultarAlertaAction,
} from '../actions/alerta.actions';

const NuevoProducto = ({ history }) => {
	const [nombre, guardarNombre] = useState('');
	const [precio, guardarPrecio] = useState(0);

	/* dispatch se va a utilizar para mandar a llamar las funciones que tengamos en nuestros actions */
	const dispatch = useDispatch();

	/* acceder al state del store */
	const cargando = useSelector(
		state => state.productos.loading,
	);
	const error = useSelector(state => state.productos.error);
	/* ver en consola nuestro state */
	// console.log(cargando);
	const alerta = useSelector(state => state.alerta.alerta);

	/* manda a llamar el action de productoAction */
	const agregarProducto = producto =>
		dispatch(crearNuevoProductoAction(producto));

	const submitNuevoProducto = e => {
		e.preventDefault();

		/* validar formulario */
		if (nombre.trim() === '' || precio <= 0) {
			const alerta = {
				msg: 'Ambos campos son obligatorios',
				classes:
					'alert alert-danger text-center text-uppercase p3',
			};
			dispatch(mostrarAlerta(alerta));
			return;
		}

		/* si no hay errores */
		dispatch(ocultarAlertaAction());

		/* crear el nuevo producto */
		agregarProducto({
			nombre,
			precio,
		});

		/* redireccionar a Home */
		history.push('/');
	};

	return (
		<div className='row justify-content-center'>
			<div className='col-md-8'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='text-center-mb-4 font-weight-bold'>
							{' '}
							Agregar Nuevo Producto
						</h2>

						{alerta ? (
							<p className={alerta.classes}>
								{alerta.msg}
							</p>
						) : null}

						<form onSubmit={submitNuevoProducto}>
							<div className='form-group'>
								<label>Nombre Producto</label>
								<input
									type='text'
									name='nombre'
									className='form-control'
									placeholder='Nombre Producto'
									value={nombre}
									onChange={e =>
										guardarNombre(e.target.value)
									}
								/>
							</div>

							<div className='form-group'>
								<label>Precio Producto</label>
								<input
									type='number'
									name='precio'
									className='form-control'
									placeholder='Precio Producto'
									value={precio}
									onChange={e =>
										guardarPrecio(
											Number(e.target.value),
										)
									}
								/>
							</div>

							<button
								type='submit'
								className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
								Agregar
							</button>
						</form>
						{cargando ? <p>Cargando...</p> : null}
						{error ? (
							<p className='alert alert-danger p2 mt-4 text-center'>
								Hubo un error
							</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
