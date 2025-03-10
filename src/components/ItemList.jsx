import React, { useState, useEffect } from "react";
import Item from './Item';  // Import the Item component
import './ItemList.css';    // Import the CSS for styling

function ItemList({ apiUri }) {
  const [items, setItems] = useState([]);  // State to store items
  const [error, setError] = useState(null); // State for error handling

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, [apiUri]);

  // Function to fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch(apiUri);
      const data = await response.json();

      // Remove duplicates based on item 'id' (make sure each item is unique)
      const uniqueItems = Array.from(new Set(data.map(a => a.id)))
        .map(id => {
          return data.find(a => a.id === id);
        });

      setItems(uniqueItems); // Update state with the unique items
    } catch (error) {
      setError("Failed to fetch items."); // Handle errors
    }
  };

  // Function to handle deleting an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUri}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item.");
      }

      // Update the list by filtering out the deleted item
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      setError("Failed to delete item."); // Handle errors
    }
  };

  return (
    <div>
      <h1>My Item List</h1> {/* Heading for the list */}
      {error && <p>{error}</p>} {/* Show error if any */}
      <ul>
        {items && items.map(item => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;