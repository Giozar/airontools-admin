import './css/deletionModal.css';

interface DeletionModalProps {
    userid: string | null;
    username: string | null;
    userimage: string;
    onClose: () => void;
    onCloseDelete: () => void;
    onDelete: () => void;
    message: string | null;
}

function DeletionModal({
    userid,
    username,
    userimage,
    onClose,
    onCloseDelete,
    onDelete,
    message
  }: DeletionModalProps) {

    const handleDeleteClick = () => {
      if (userid && username) {
        onDelete(); // Llama a onDelete para eliminar al usuario del servidor
      }
    };

    const handleContinueClick = (mensaje : string) =>{
      onClose();
      if (!mensaje.includes("No se ha podido eliminar")){
        onCloseDelete();
      }
    }

    return (
      <div>
        <div className="deletionmodal">
          {message ? (
            <div>
              <p>{message}</p>
              <button className="continue" onClick={() => handleContinueClick(message)}>Continuar</button>
            </div>
          ) : (
            <>
              <h2>Confirmación de Eliminación</h2>
              <p>¿Estás seguro de que deseas eliminar a {username}?</p>
              <img src={userimage} alt='usuario a eliminar' />
              <h4>{userid}</h4>
              <div className="buttons">
                <button className="cancel" onClick={onClose}>Cancelar</button>
                <button className="delete" onClick={handleDeleteClick}>Eliminar</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  export default DeletionModal;