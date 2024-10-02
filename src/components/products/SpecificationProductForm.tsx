import '@components/css/createSpecs.css';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecificationService from '@services/specifications/createSpecification.service';
import { useState } from 'react';

export default function SpecificationProductForm() {
	const { ...product } = useProductCreateContext();
	const { user } = useAuthContext();
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const createdBy = user?.id || 'user';
	const { showAlert } = useAlert();

	// Añade una nueva especificación
	const addSpecifications = () => {
		const families = [product.family];
		const categories = [product.category];
		const subcategories = [product.subcategory];
		setSpecifications(prevSpecs => [
			...prevSpecs,
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				families,
				categories,
				subcategories: subcategories || '',
			},
		]);
	};

	// Elimina una especificación por su índice
	const deleteSpecificationService = (index: number) => {
		setSpecifications(prevSpecs => prevSpecs.filter((_, i) => i !== index));
	};

	// Maneja cambios en los campos de una especificación
	const handleInputChangeInSpec = (
		index: number,
		field: keyof SpecDataToSend,
		value: string,
	) => {
		setSpecifications(prevSpecs => {
			const newSpecs = [...prevSpecs];
			newSpecs[index] = {
				...newSpecs[index],
				[field]: value,
			};
			return newSpecs;
		});
	};

	// Guarda las especificaciones
	const saveSpecifications = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault;
		for (const specification of specifications) {
			try {
				await createSpecificationService({
					specification,
				});
				showAlert('Especificación creada con éxito', 'success');
				setSpecifications([]);
			} catch (error) {
				const err = error as ErrorResponse;
				showAlert(
					`Ocurrió un error al crear la especificación ${err.message}`,
					'error',
				);
			}
		}
	};

	return (
		<div id='specifications'>
			{specifications.map((spec, index) => (
				<div
					key={index}
					id={`especificacion-${index}`}
					className='especificacion'
				>
					<p>
						Especificación {index + 1}{' '}
						<button
							onClick={() => deleteSpecificationService(index)}
							className='delete'
						>
							Borrar
						</button>
					</p>

					<section className='form-group'>
						<input
							type='text'
							placeholder='Nombre'
							value={spec.name}
							onChange={e =>
								handleInputChangeInSpec(index, 'name', e.target.value)
							}
							required
						/>
						<textarea
							placeholder='Descripción (opcional)'
							value={spec.description}
							onChange={e =>
								handleInputChangeInSpec(index, 'description', e.target.value)
							}
						/>
						<input
							id='unit'
							type='text'
							placeholder='Unidades (opcional)'
							value={spec.unit}
							onChange={e =>
								handleInputChangeInSpec(index, 'unit', e.target.value)
							}
						/>
					</section>
				</div>
			))}
			<button onClick={addSpecifications}>Agregar Especificación</button>
			<button
				onClick={e => {
					saveSpecifications(e);
				}}
				className='save'
			>
				Guardar Especificaciones
			</button>
		</div>
	);
}
