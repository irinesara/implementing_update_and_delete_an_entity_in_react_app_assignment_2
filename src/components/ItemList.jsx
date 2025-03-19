import React, { useState, useEffect } from "react";
import Item from './Item';  
import './ItemList.css';    

function ItemList({ apiUri }) {
  const [items, setItems] = useState([]);  
  const [error, setError] = useState(null); 


  useEffect(() => {
    fetchItems();
  }, [apiUri]);

 
  const fetchItems = async () => {
    try {
      const response = await fetch(apiUri);
      const data = await response.json();


      const uniqueItems = Array.from(new Set(data.map(a => a.id)))
        .map(id => {
          return data.find(a => a.id === id);
        });

      setItems(uniqueItems); 
    } catch (error) {
      setError("Failed to fetch items.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUri}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item.");
      }

      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      setError("Failed to delete item."); 
    }
  };

  
  const handleEdit = async (id, newName) => {
    try {
      const response = await fetch(`${apiUri}/${id}`, {
        method: "PATCH", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }), 
      });

      if (!response.ok) {
        throw new Error("Failed to update item.");
      }

      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, name: newName } : item
        )
      );
    } catch (error) {
      setError("Failed to update item.");
    }
  };

  return (
    <div>
      <h1>My Item List</h1> 
      {error && <p>{error}</p>} 
      <ul>
        {items && items.map(item => (
          <Item 
            key={item.id} 
            item={item} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
