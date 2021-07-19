import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

/* Redux */
import { useDispatch } from 'react-redux';
import {
	borrarProductoAction,
	obtenerProductoEditar,
} from '../actions/producto.actions';

const Productos = ({ producto }) => {
	const { nombre, precio, id } = producto;

	const dispatch = useDispatch();
	const history = useHistory(); // habilita history para redirección

	const confirmaEliminarProducto = id => {
		/* preguntar si esta seguro de eliminar */
		Swal.fire({
			title: `¿Estas seguro que deseas eliminar ${nombre}?`,
			text: `Una vez que se elimina no podras recuperar ${nombre}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Sí, eliminar ${nombre}`,
			cancelButtonText: 'Cancelar',
		}).then(result => {
			if (result.isConfirmed) {
				/* pasarlo al action */
				dispatch(borrarProductoAction(id));
			}
		});
	};

	/* fn que redirige de forma programada a editar producto */
	const redireccionarEdicion = producto => {
		dispatch(obtenerProductoEditar(producto));
		history.push(`/productos/editar/${producto.id}`);
	};

	return (
		<tr>
			<td>{nombre}</td>
			<td>
				<span className='font-weight-bold'>$ {precio}</span>
			</td>
			<td className='acciones'>
				<button
					type='button'
					onClick={() => redireccionarEdicion(producto)}
					className='btn btn-primary mr-2'>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-danger'
					onClick={() => confirmaEliminarProducto(id)}>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Productos;
