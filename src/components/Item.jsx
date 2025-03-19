import React, { useState } from 'react';

function Item({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  const handleEditChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEditSubmit = () => {
    onEdit(item.id, editedName); // Pass the new name to the parent
    setIsEditing(false); // Exit edit mode
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editedName} 
            onChange={handleEditChange} 
          />
          <button onClick={handleEditSubmit}>Save</button>
        </>
      ) : (
        <>
          {item.name}
          <button onClick={() => onDelete(item.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}

export default Item;
