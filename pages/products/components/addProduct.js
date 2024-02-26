import React, { useState } from 'react';

const AddProduct = () => {  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {      
      const response = await fetch('https://localhost:44394/api/Product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price }),
      });
      if (response.ok) {        
        console.log('Product added successfully!');
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
