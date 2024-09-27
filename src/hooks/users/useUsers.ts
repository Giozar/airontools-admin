import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useUserContext } from '@contexts/User/UserContext';
import { deleteFileService } from '@services/files/deleteFile.service';
import uploadFileService from '@services/files/fileUpload.service';
import createUserService from '@services/users/createUser.service';
import { getUserService } from '@services/users/getUser.service';
import { updateUserService } from '@services/users/updateUser.service';
import { errorHandler } from '@utils/errorHandler.util';
import { FormEvent, useEffect } from 'react';
import useUserUpdate from './useUserUpdate';

export default function useUsers(userToEdit: string | null) {
	const {
		id,
		setId,
		name,
		setName,
		email,
		setEmail,
		imageUrl,
		setImageUrl,
		rawImage,
		setRawImage,
		role,
		setRole,
		createdBy,
		setCreatedBy,
		password,
	} = useUserContext();
	const { showAlert } = useAlert();
	const { user } = useAuthContext();
	const { updateUser } = useUserUpdate();

	useEffect(() => {
		if (user) {
			setCreatedBy(user.id);
		}
	}, [user]);

	useEffect(() => {
		const getUserData = async () => {
			if (userToEdit) {
				try {
					const userData = await getUserService(userToEdit);
					if (userData) {
						setId(userData.id);
						setName(userData.name);
						setEmail(userData.email);
						setImageUrl(userData.imageUrl);
						setRawImage(null);
						setRole(userData.role?.id || '');
						setCreatedBy(userData.createdBy?.id || '');
					}
				} catch (error) {
					showAlert(
						('No se pudo recuperar los datos del usuario' + error) as string,
						'error',
					);
				}
			}
		};
		if (userToEdit) getUserData();
	}, [userToEdit]);

	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			const url = await uploadFileService(rawImage, 'image', id);
			console.log('Imagen subida ', url);
			return url;
		} catch (error) {
			console.error('No se pudo subir archivos:', rawImage, error);
			errorHandler(error);
		}
	};

	const handleDeleteFile = async (fileId: string) => {
		try {
			await deleteFileService(fileId);
		} catch (error) {
			console.error(`Error al eliminar archivo ${fileId}:`, error);
			showAlert('no se pudo borrar el archivo', 'error');
		}
	};

	const handleSubmitCreate = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!role) throw new Error('Elige un rol válido');

			const userCreated = await createUserService({
				password,
				imageUrl,
				email,
				name,
				role,
				createdBy,
			});
			showAlert(`Usuario ${userCreated.name} creado con éxito`, 'success');
			if (rawImage) {
				const uploadedUrlImage = await handleRawImageUpload(
					rawImage,
					userCreated.id,
				);
				if (uploadedUrlImage) {
					const updatedUser = await updateUser(userCreated.id || '', {
						imageUrl: uploadedUrlImage,
						name: userCreated.name,
						email: userCreated.email,
					});
					console.log(updatedUser);
					showAlert(
						`Imagen y usuario ${userCreated.name} creados con éxito`,
						'success',
					);
				}
			}
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} catch (error) {
			showAlert('error con el usuario' + error, 'error');
		}
	};

	const handleSubmitUpdate = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!userToEdit) throw new Error('No hay usuario para editar');
			if (!role) throw new Error(' Elige un rol válido');

			let uploadedUrlImage = null;
			if (rawImage && id) {
				uploadedUrlImage = await handleRawImageUpload(rawImage, id);
				if (imageUrl) await handleDeleteFile(imageUrl);
			}
			if (password) {
				await updateUserService(id || '', {
					password,
					imageUrl: uploadedUrlImage || imageUrl,
					email,
					name,
					role,
					createdBy,
				});
			} else {
				await updateUserService(id || '', {
					imageUrl: uploadedUrlImage || imageUrl,
					email,
					name,
					role,
					createdBy,
				});
			}
			showAlert('Usuario actualizado con exito', 'success');
		} catch (error) {
			console.log({
				id: id || '',
				imageUrl: imageUrl || '',
				email,
				name,
				role,
				createdBy,
			});
			console.error('Error al subir datos del usuario:', error);
			showAlert(error as string, 'error');
		}
	};
	return {
		handleSubmitCreate,
		handleSubmitUpdate,
	};
}
