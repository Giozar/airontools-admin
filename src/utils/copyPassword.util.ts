export const copyPassword = (password: string) => {
	navigator.clipboard
		.writeText(password)
		.then(() => {
			alert('¡Se copió la contraseña!');
		})
		.catch(err => {
			console.error('Error al copiar la contraseña: ', err);
		});
};
/*
export const copyPassword = (password: string) => {
    // Intenta usar la API moderna del portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('¡Se copió la contraseña!');
            })
            .catch(err => {
                console.error('Error al copiar la contraseña usando navigator.clipboard: ', err);
                fallbackCopy(password);
            });
    } else {
        // Si navigator.clipboard no está disponible, usa el método alternativo
        fallbackCopy(password);
    }
};

// Función alternativa usando document.execCommand
const fallbackCopy = (password: string) => {
    // Crea un elemento textarea
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);

    // Selecciona el contenido del textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móviles

    try {
        // Intenta copiar el texto usando document.execCommand
        const successful = document.execCommand('copy');
        if (successful) {
            alert('¡Se copió la contraseña!');
        } else {
            console.error('No se pudo copiar la contraseña usando document.execCommand.');
        }
    } catch (err) {
        console.error('Error al copiar la contraseña usando document.execCommand: ', err);
    } finally {
        // Limpia y elimina el textarea
        document.body.removeChild(textarea);
    }
};
*/
