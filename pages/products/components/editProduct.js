import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {        
        const response = await fetch(`https://localhost:44394/api/Product`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setName(data.name);
          setPrice(data.price);
        } else {
          console.error('Error fetching product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {      
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, price }),
      });
      if (response.ok) {        
        console.log('Product updated successfully!');
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <p>Product ID: {id}</p>
      {product && (
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
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
