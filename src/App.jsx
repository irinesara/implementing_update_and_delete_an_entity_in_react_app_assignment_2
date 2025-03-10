import React from 'react';
import ItemList from './components/ItemList';


function App() {
  const API_URI = 'https://jsonplaceholder.typicode.com/posts';  // Mock API

  return (
    <div className="App">
      <h1>My Item Management App</h1>
      {/* Pass the API URI to ItemList */}
      <ItemList apiUri={API_URI} />
    </div>
  );
}

export default App;