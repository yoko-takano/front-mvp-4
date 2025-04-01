import React, { useState, useEffect } from 'react';
import '../styles/modal-style.css'; // Arquivo de estilos para o modal

const EditModal = ({ isOpen, onClose, title, initialValue, onSave }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Sempre que o modal for aberto com um novo initialValue, o estado value é atualizado
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]); // Dependências: atualiza o valor sempre que isOpen ou initialValue mudam

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <input
          type="text"
          value={value}
          className="modal-input" 
          placeholder="Digite aqui..."
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
