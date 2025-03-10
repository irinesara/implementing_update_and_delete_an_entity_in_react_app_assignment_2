import React from 'react';

function Item({ item, onDelete }) {
  return (
    <li>
      {item.name}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
}

export default Item;