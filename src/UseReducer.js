import React, { useEffect, useReducer, Fragment } from 'react'

const SECURITY_CODE = 'paradigma'
const initialState = {
	value: '',
	loading: false,
	error: false,
	deleted: false,
	confirmed: false,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'Error':
			return {
				...state,
				error: true,
				loading: false,
			}
		case 'Confirm':
			return {
				...state,
				loading: false,
				error: false,
				confirmed: true,
			}
		case 'Write':
			return {
				...state,
				value: action.payload,
			}
		case 'Check':
			return {
				...state,
				loading: true,
				error: false,
			}
		case 'Delete':
			return {
				...state,
				deleted: true,
			}
		case 'Reset':
			return {
				...state,
				value: '',
				confirmed: false,
				deleted: false,
			}
		default:
			return {
				...state,
			}
	}
}

export default function UseReducer() {
	const [ state, dispatch ] = useReducer(reducer, initialState)

	useEffect(
		() => {
			if (state.loading) {
				setTimeout(() => {
					if (state.value === SECURITY_CODE) {
						dispatch({ type: 'Confirm' })
					} else {
						dispatch({ type: 'Error' })
					}
				}, 1000)
			}
		},
		[ state.loading ]
	)

	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>Eliminar UseReducer</h2>
				<p>Por favor, escriba el código de seguridad.</p>
				{state.loading ? 'Cargando...' : state.error ? 'Error :(' : null}
				<br />
				<input
					type='text'
					placeholder='código de seguridad'
					value={state.value}
					onChange={ev => dispatch({ type: 'Write', payload: ev.target.value })}
				/>
				<button
					onClick={() => {
						dispatch({ type: 'Check' })
					}}
				>
					Comprobar
				</button>
			</div>
		)
	} else if (!state.deleted && state.confirmed) {
		return (
			<Fragment>
				<p>Pedimos confirmación. ¿Tas seguro?</p>
				<button onClick={() => dispatch({ type: 'Delete' })}>Si, eliminar</button>
				<button onClick={() => dispatch({ type: 'Reset' })}>No, me arrepentí</button>
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<p>Eliminado con éxito</p>
				<button onClick={() => dispatch({ type: 'Reset' })}>Regresar</button>
			</Fragment>
		)
	}
}
